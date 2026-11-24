/// <reference types="google.maps" />

import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  InfoWindow,
  Map as GoogleMap,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
} from '@vis.gl/react-google-maps';
import {
  Clock,
  Crosshair,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Search,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LOCATIONS } from '../data/locations';
import { LOCALES } from '../locales';
import { Language, LocationFilter, LocationRecord } from '../types';

interface LocationsProps {
  lang: Language;
}

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  process.env.GOOGLE_MAPS_API_KEY ||
  '';

const CHISINAU_CENTER: google.maps.LatLngLiteral = {
  lat: 47.0245,
  lng: 28.838,
};

const Z_INDEX_SELECTED = 1000;

interface CoffeeShopMarkerProps {
  location: LocationRecord;
  isSelected: boolean;
  baseZIndex: number;
  onRegisterMarker: (
    id: string,
    marker: google.maps.marker.AdvancedMarkerElement | null
  ) => void;
  onSelect: (
    location: LocationRecord,
    marker: google.maps.marker.AdvancedMarkerElement | null
  ) => void;
}

function CoffeeShopMarker({
  location,
  isSelected,
  baseZIndex,
  onRegisterMarker,
  onSelect,
}: CoffeeShopMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    onRegisterMarker(location.id, marker);
    return () => onRegisterMarker(location.id, null);
  }, [location.id, marker, onRegisterMarker]);

  const position = useMemo<google.maps.LatLngLiteral>(
    () => ({
      lat: location.coordinates[0],
      lng: location.coordinates[1],
    }),
    [location.coordinates]
  );

  return (
    <AdvancedMarker
      ref={markerRef}
      position={position}
      zIndex={isSelected ? Z_INDEX_SELECTED : baseZIndex}
      anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
      title={`${location.name} — ${location.address}`}
      onClick={() => onSelect(location, marker)}
    >
      <div
        className="feeling-marker-icon flex items-center justify-center rounded-full cursor-pointer transition-transform duration-150"
        style={{
          width: isSelected ? 40 : 28,
          height: isSelected ? 40 : 28,
          backgroundColor: isSelected ? '#38251D' : '#171310',
          border: isSelected ? '3px solid #A77B55' : '2px solid #FFFFFF',
          boxShadow: isSelected
            ? '0 8px 20px rgba(56, 37, 29, 0.45)'
            : '0 2px 8px rgba(23, 19, 16, 0.28)',
        }}
      >
        {isSelected ? (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="#F5F0E8"
            className="pointer-events-none"
            aria-hidden="true"
          >
            <path d="M11.6 3.5C7.6 4.2 5.6 8 6.3 12.7c.5 3.5 2.7 6.1 5.3 6.9-1.2-3-1.3-6.8 0-10.6 1-2.9.8-4.5 0-5.5Zm1.4 0c1.2 3 1.3 6.8 0 10.6-1 2.9-.8 4.5 0 5.5 4-.7 6-4.5 5.3-9.2-.5-3.5-2.7-6.1-5.3-6.9Z" />
          </svg>
        ) : (
          <span className="font-mono text-[10px] font-semibold leading-none text-[#F5F0E8] pointer-events-none select-none">
            {location.index}
          </span>
        )}
      </div>
    </AdvancedMarker>
  );
}

interface MapCameraControllerProps {
  filteredLocations: LocationRecord[];
  activeLocation: LocationRecord | null;
  fitTrigger: number;
}

function MapCameraController({
  filteredLocations,
  activeLocation,
  fitTrigger,
}: MapCameraControllerProps) {
  const map = useMap();

  const fitBoundsToLocations = useCallback(
    (items: LocationRecord[]) => {
      if (!map || items.length === 0) return;

      if (items.length === 1) {
        map.panTo({
          lat: items[0].coordinates[0],
          lng: items[0].coordinates[1],
        });
        map.setZoom(15);
        return;
      }

      const bounds = new google.maps.LatLngBounds();
      items.forEach((item) => {
        bounds.extend({
          lat: item.coordinates[0],
          lng: item.coordinates[1],
        });
      });
      map.fitBounds(bounds, { top: 44, right: 44, bottom: 44, left: 44 });
    },
    [map]
  );

  // Fit all visible markers on initial mount, filter change (when unfocused), or Show All trigger
  useEffect(() => {
    if (!map) return;
    if (!activeLocation) {
      fitBoundsToLocations(filteredLocations);
    }
  }, [map, filteredLocations, activeLocation, fitTrigger, fitBoundsToLocations]);

  // Center and zoom cleanly onto selected location
  useEffect(() => {
    if (!map || !activeLocation) return;
    map.panTo({
      lat: activeLocation.coordinates[0],
      lng: activeLocation.coordinates[1],
    });
    const currentZoom = map.getZoom() ?? 13;
    if (currentZoom < 15) {
      map.setZoom(15);
    }
  }, [map, activeLocation]);

  return null;
}

interface MapViewportProps {
  filteredLocations: LocationRecord[];
  selectedId: string | null;
  activeLocation: LocationRecord | null;
  infoWindowOpen: boolean;
  fitTrigger: number;
  t: (typeof LOCALES)['ro']['locations'];
  onSelectFromMap: (
    location: LocationRecord,
    marker: google.maps.marker.AdvancedMarkerElement | null
  ) => void;
  onCloseInfoWindow: () => void;
  onRegisterMarker: (
    id: string,
    marker: google.maps.marker.AdvancedMarkerElement | null
  ) => void;
  markerInstancesRef: React.MutableRefObject<
    Record<string, google.maps.marker.AdvancedMarkerElement | null>
  >;
}

function MapViewport({
  filteredLocations,
  selectedId,
  activeLocation,
  infoWindowOpen,
  fitTrigger,
  t,
  onSelectFromMap,
  onCloseInfoWindow,
  onRegisterMarker,
  markerInstancesRef,
}: MapViewportProps) {
  const apiStatus = useApiLoadingStatus();

  // Sort by latitude descending so southern pins render cleanly in front of northern pins
  const orderedLocations = useMemo(
    () =>
      [...filteredLocations]
        .sort((a, b) => b.coordinates[0] - a.coordinates[0])
        .map((loc, idx) => ({ loc, baseZIndex: idx + 1 })),
    [filteredLocations]
  );

  const selectedMarkerInstance =
    activeLocation ? markerInstancesRef.current[activeLocation.id] ?? null : null;

  if (
    apiStatus === APILoadingStatus.FAILED ||
    apiStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <div className="w-full h-[360px] sm:h-[440px] lg:h-[560px] bg-[#EBE3D6] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <MapPin className="w-7 h-7 text-[#A77B55]" />
        <p className="font-serif text-xl font-medium text-[#171310]">
          {activeLocation ? activeLocation.name : 'Feeling Coffee · Chișinău'}
        </p>
        <p className="text-xs sm:text-sm text-[#38251D] max-w-md">
          {activeLocation
            ? activeLocation.address
            : `${filteredLocations.length} Chișinău`}
        </p>
        {activeLocation && (
          <a
            href={activeLocation.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#171310] hover:bg-[#38251D] rounded-sm transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{t.directionsCta}</span>
          </a>
        )}
      </div>
    );
  }

  return (
    <div
      aria-label="Interactive Google Maps Chișinău locations map"
      className="relative w-full h-[360px] sm:h-[440px] lg:h-[560px] bg-[#EBE3D6]"
    >
      {apiStatus === APILoadingStatus.LOADING && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#EBE3D6]/85 text-xs font-mono uppercase tracking-wider text-[#38251D]">
          Google Maps · Chișinău...
        </div>
      )}

      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={CHISINAU_CENTER}
        defaultZoom={13}
        gestureHandling="cooperative"
        zoomControl={true}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={true}
        clickableIcons={false}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <MapCameraController
          filteredLocations={filteredLocations}
          activeLocation={activeLocation}
          fitTrigger={fitTrigger}
        />

        {orderedLocations.map(({ loc, baseZIndex }) => (
          <CoffeeShopMarker
            key={loc.id}
            location={loc}
            isSelected={loc.id === selectedId}
            baseZIndex={baseZIndex}
            onRegisterMarker={onRegisterMarker}
            onSelect={onSelectFromMap}
          />
        ))}

        {infoWindowOpen && activeLocation && (
          <InfoWindow
            anchor={selectedMarkerInstance}
            position={
              selectedMarkerInstance
                ? undefined
                : {
                    lat: activeLocation.coordinates[0],
                    lng: activeLocation.coordinates[1],
                  }
            }
            pixelOffset={[0, -16]}
            maxWidth={270}
            onCloseClick={onCloseInfoWindow}
          >
            <div className="min-w-[210px] max-w-[250px] py-1 pr-1 font-sans text-[#171310]">
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#A77B55]">
                {activeLocation.index} · {activeLocation.sectorLabel}
              </div>
              <div className="mt-0.5 font-serif text-lg font-semibold leading-tight text-[#171310]">
                {activeLocation.name}
              </div>
              <div className="mt-1 text-xs text-[#38251D]">
                {activeLocation.address}
              </div>

              <div className="mt-2 pt-1.5 border-t border-[#D9C9B7] text-[11px] text-[#38251D] space-y-0.5">
                {activeLocation.openingHours ? (
                  activeLocation.openingHours.map((line) => (
                    <div key={line.daysKey}>
                      {t.days[line.daysKey]}: {line.hours}
                    </div>
                  ))
                ) : (
                  <div className="opacity-80">{t.checkOpeningHours}</div>
                )}
              </div>

              {activeLocation.phone && (
                <div className="mt-1.5 font-mono text-[11px] text-[#171310]">
                  {t.phoneLabel}: {activeLocation.phone}
                </div>
              )}

              <a
                href={activeLocation.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1.5 bg-[#171310] hover:bg-[#38251D] text-white text-[11px] font-semibold rounded-sm transition-colors no-underline"
              >
                <span>{t.directionsCta}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function Locations({ lang }: LocationsProps) {
  const t = LOCALES[lang].locations;
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<LocationFilter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [fitTrigger, setFitTrigger] = useState(0);

  const markerInstancesRef = useRef<
    Record<string, google.maps.marker.AdvancedMarkerElement | null>
  >({});
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const filteredLocations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LOCATIONS.filter((loc) => {
      if (filter === 'centru' && loc.sector !== 'centru') return false;
      if (filter === 'sectors' && loc.sector === 'centru') return false;
      if (filter === 'with_hours' && !loc.openingHours) return false;
      if (!q) return true;

      const text = [
        loc.name,
        loc.address,
        loc.sectorLabel,
        loc.landmark ?? '',
        loc.city,
      ]
        .join(' ')
        .toLowerCase();
      return text.includes(q);
    });
  }, [searchQuery, filter]);

  const activeLocation: LocationRecord | null = useMemo(() => {
    if (!selectedId) return null;
    return filteredLocations.find((l) => l.id === selectedId) ?? null;
  }, [filteredLocations, selectedId]);

  const handleRegisterMarker = useCallback(
    (id: string, marker: google.maps.marker.AdvancedMarkerElement | null) => {
      markerInstancesRef.current[id] = marker;
    },
    []
  );

  const handleSelectFromMap = useCallback(
    (
      loc: LocationRecord,
      marker: google.maps.marker.AdvancedMarkerElement | null
    ) => {
      if (marker) {
        markerInstancesRef.current[loc.id] = marker;
      }
      setSelectedId(loc.id);
      setInfoWindowOpen(true);

      const cardEl = cardRefs.current[loc.id];
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    },
    []
  );

  const handleSelectCard = useCallback((loc: LocationRecord) => {
    setSelectedId(loc.id);
    setInfoWindowOpen(true);
  }, []);

  const handleShowAll = useCallback(() => {
    setSelectedId(null);
    setInfoWindowOpen(false);
    setFitTrigger((c) => c + 1);
  }, []);

  const handleCloseInfoWindow = useCallback(() => {
    setInfoWindowOpen(false);
  }, []);

  const filterButtons: { id: LocationFilter; label: string }[] = [
    { id: 'all', label: t.filters.all },
    { id: 'centru', label: t.filters.centru },
    { id: 'sectors', label: t.filters.sectors },
    { id: 'with_hours', label: t.filters.with_hours },
  ];

  const countText = t.showingCount
    .replace('{{visible}}', String(filteredLocations.length))
    .replace('{{total}}', String(LOCATIONS.length));

  return (
    <section
      id="locations"
      className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#D9C9B7]/70 text-[#171310]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Editorial Section Header */}
        <div className="border-b border-[#D9C9B7] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-[#A77B55]">
                {t.sectionIndex}
              </span>
              <span className="h-px w-8 bg-[#A77B55]" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#38251D]">
                {t.kicker}
              </p>
            </div>
            <h2
              className="font-serif font-medium text-[#171310] leading-[1.06] tracking-tight"
              style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.35rem)', textWrap: 'balance' }}
            >
              {t.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#38251D] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs sm:text-sm font-mono font-medium text-[#38251D] tabular-nums">
              {countText}
            </span>
          </div>
        </div>

        {/* Network Transparency Strip */}
        <p className="text-xs sm:text-sm text-[#38251D] bg-[#F5F0E8] border border-[#D9C9B7] rounded-sm px-4 py-3 leading-relaxed">
          {t.networkNote}
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search
              aria-hidden="true"
              className="w-4 h-4 text-[#A77B55] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedId(null);
                setInfoWindowOpen(false);
              }}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 min-h-[44px] text-sm text-[#171310] placeholder:text-[#38251D]/60 bg-[#F5F0E8] border border-[#D9C9B7] rounded-sm focus:outline-none focus:border-[#171310] transition-colors"
            />
          </div>

          <div
            role="group"
            aria-label="Filter locations"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#F5F0E8] border border-[#D9C9B7] rounded-sm w-fit"
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  setFilter(btn.id);
                  setSelectedId(null);
                  setInfoWindowOpen(false);
                }}
                className={`px-3 py-1.5 min-h-[36px] text-xs sm:text-sm font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === btn.id
                    ? 'bg-[#171310] text-white'
                    : 'text-[#38251D] hover:text-[#171310]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Google Map + Scrollable Directory Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Google Maps Platform Column */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 bg-[#F5F0E8] border border-[#D9C9B7] rounded-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D9C9B7] flex flex-wrap items-center justify-between gap-3 bg-[#F5F0E8]">
              <div className="min-w-0">
                <div className="text-xs font-mono uppercase tracking-wider text-[#A77B55]">
                  {countText}
                </div>
                {activeLocation ? (
                  <p className="text-sm font-semibold text-[#171310] truncate">
                    {activeLocation.name} · {activeLocation.address}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-[#38251D]">
                    Chișinău · {filteredLocations.length}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleShowAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-medium text-[#171310] bg-white border border-[#D9C9B7] hover:border-[#171310] rounded-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Crosshair className="w-3.5 h-3.5 text-[#A77B55]" />
                  <span>{t.showAllOnMap}</span>
                </button>

                {activeLocation && (
                  <a
                    href={activeLocation.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-medium text-white bg-[#171310] hover:bg-[#38251D] rounded-sm transition-colors whitespace-nowrap"
                  >
                    <span>{t.directionsCta}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {GOOGLE_MAPS_API_KEY ? (
              <APIProvider
                apiKey={GOOGLE_MAPS_API_KEY}
                libraries={['marker']}
                language={lang}
                region="MD"
              >
                <MapViewport
                  filteredLocations={filteredLocations}
                  selectedId={selectedId}
                  activeLocation={activeLocation}
                  infoWindowOpen={infoWindowOpen}
                  fitTrigger={fitTrigger}
                  t={t}
                  onSelectFromMap={handleSelectFromMap}
                  onCloseInfoWindow={handleCloseInfoWindow}
                  onRegisterMarker={handleRegisterMarker}
                  markerInstancesRef={markerInstancesRef}
                />
              </APIProvider>
            ) : (
              <div className="w-full h-[360px] sm:h-[440px] lg:h-[560px] bg-[#EBE3D6] flex flex-col items-center justify-center p-6 text-center space-y-3">
                <MapPin className="w-7 h-7 text-[#A77B55]" />
                <p className="font-serif text-xl font-medium text-[#171310]">
                  Feeling Coffee · Chișinău ({filteredLocations.length})
                </p>
                <p className="text-xs sm:text-sm text-[#38251D] max-w-md">
                  {t.subtitle}
                </p>
              </div>
            )}
          </div>

          {/* Synchronized Location Cards Column */}
          <div className="lg:col-span-5">
            {filteredLocations.length === 0 ? (
              <div className="bg-[#F5F0E8] border border-[#D9C9B7] rounded-sm p-10 text-center space-y-3">
                <p className="font-serif text-2xl font-medium text-[#171310]">
                  {t.emptyTitle}
                </p>
                <p className="text-sm text-[#38251D]">{t.emptySubtitle}</p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setFilter('all');
                      setSelectedId(null);
                      setInfoWindowOpen(false);
                    }}
                    className="px-5 py-2.5 min-h-[44px] text-sm font-medium text-white bg-[#171310] hover:bg-[#38251D] rounded-sm transition-colors cursor-pointer"
                  >
                    {t.resetFilters}
                  </button>
                </div>
              </div>
            ) : (
              <div className="lg:max-h-[626px] lg:overflow-y-auto lg:pr-1.5 space-y-3">
                {filteredLocations.map((loc) => {
                  const isSelected = loc.id === selectedId;
                  return (
                    <article
                      key={loc.id}
                      ref={(el) => {
                        cardRefs.current[loc.id] = el;
                      }}
                      className={`rounded-sm border p-5 transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#F5F0E8] border-[#171310]'
                          : 'bg-[#FAF8F4] border-[#D9C9B7] hover:border-[#A77B55]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 text-xs text-[#38251D]/80">
                          <span className="font-mono tabular-nums font-medium">
                            {loc.index} · {loc.sectorLabel}
                          </span>
                          {isSelected && (
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#A77B55] font-semibold">
                              {t.selectedBadge}
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="font-serif text-xl font-semibold text-[#171310] leading-snug">
                            {loc.name}
                          </h3>
                          <p className="mt-1 flex items-start gap-1.5 text-sm text-[#38251D]">
                            <MapPin className="w-4 h-4 text-[#A77B55] shrink-0 mt-0.5" />
                            <span>{loc.address}</span>
                          </p>
                        </div>

                        {loc.phone && (
                          <p className="text-xs sm:text-sm text-[#38251D] flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#A77B55] shrink-0" />
                            <span>{t.phoneLabel}:</span>
                            <a
                              href={`tel:+373${loc.phone.replace(/\s+/g, '').replace(/^0/, '')}`}
                              className="font-mono font-semibold text-[#171310] hover:underline tabular-nums"
                            >
                              {loc.phone}
                            </a>
                          </p>
                        )}

                        <div className="pt-2.5 border-t border-[#D9C9B7]/70 space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#171310]">
                            <Clock className="w-3.5 h-3.5 text-[#A77B55]" />
                            <span>{t.hoursHeading}</span>
                          </div>

                          {loc.openingHours ? (
                            <div className="space-y-0.5 text-xs text-[#38251D]">
                              {loc.openingHours.map((row) => (
                                <div
                                  key={row.daysKey}
                                  className="flex items-center justify-between gap-2 font-mono tabular-nums"
                                >
                                  <span className="font-sans">{t.days[row.daysKey]}</span>
                                  <span>{row.hours}</span>
                                </div>
                              ))}
                              {loc.hoursSourceNote && (
                                <p className="pt-0.5 text-[11px] text-[#A77B55]">
                                  {t.referenceHoursBadge}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-[#38251D]/80">
                              {t.checkOpeningHours}
                            </p>
                          )}
                        </div>

                        <div className="pt-1 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSelectCard(loc)}
                            aria-pressed={isSelected}
                            className={`px-3.5 py-2 min-h-[40px] text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isSelected
                                ? 'bg-[#38251D] text-white border-[#38251D]'
                                : 'bg-white text-[#171310] border-[#D9C9B7] hover:border-[#171310]'
                            }`}
                          >
                            {t.focusOnMap}
                          </button>

                          <a
                            href={loc.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-medium text-white bg-[#171310] hover:bg-[#38251D] rounded-sm transition-colors whitespace-nowrap"
                          >
                            <Navigation className="w-3.5 h-3.5 shrink-0" />
                            <span>{t.directionsCta}</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
