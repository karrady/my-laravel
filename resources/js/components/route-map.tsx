import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LatLng {
    lat: number;
    lng: number;
}

export interface RouteInfo {
    distance_km: number;
    duration_min: number;
}

interface RouteMapProps {
    origin?: LatLng | null;
    destination?: LatLng | null;
    onRouteCalculated?: (info: RouteInfo) => void;
    onRouteClear?: () => void;
    className?: string;
}

// Gouda centrum als standaard startpositie
const DEFAULT_CENTER: [number, number] = [52.0116, 4.7083];
const DEFAULT_ZOOM = 11;

function makeMarker(color: "yellow" | "white") {
    const bg = color === "yellow" ? "#FFD200" : "#ffffff";
    const text = color === "yellow" ? "#0E0E0E" : "#0E0E0E";
    const label = color === "yellow" ? "A" : "B";
    return L.divIcon({
        className: "",
        iconAnchor: [18, 18],
        html: `<div style="
            width:36px;height:36px;border-radius:50%;
            background:${bg};color:${text};
            display:flex;align-items:center;justify-content:center;
            font-weight:800;font-size:14px;font-family:Montserrat,sans-serif;
            box-shadow:0 2px 8px rgba(0,0,0,0.45);
            border:2px solid rgba(0,0,0,0.15);
        ">${label}</div>`,
    });
}

export function RouteMap({ origin, destination, onRouteCalculated, onRouteClear, className }: RouteMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef       = useRef<L.Map | null>(null);
    const originRef    = useRef<L.Marker | null>(null);
    const destRef      = useRef<L.Marker | null>(null);
    const routeRef     = useRef<L.Polyline | null>(null);

    // Initialiseer kaart één keer
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const map = L.map(containerRef.current, {
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            zoomControl: true,
            attributionControl: false,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            subdomains: "abcd",
            maxZoom: 19,
        }).addTo(map);

        // Kleine attributie rechtsonder
        L.control.attribution({ prefix: false, position: "bottomright" })
            .addAttribution('&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>')
            .addTo(map);

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // Update markers + route bij coordinaatwijziging
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // Verwijder oude markers en route
        originRef.current?.remove();
        destRef.current?.remove();
        routeRef.current?.remove();
        originRef.current = destRef.current = routeRef.current = null;

        if (!origin || !destination) onRouteClear?.();

        if (origin) {
            originRef.current = L.marker([origin.lat, origin.lng], { icon: makeMarker("yellow") }).addTo(map);
        }
        if (destination) {
            destRef.current = L.marker([destination.lat, destination.lng], { icon: makeMarker("white") }).addTo(map);
        }

        if (origin && destination) {
            // Haal route op via OSRM (gratis, geen API-key)
            const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

            fetch(url)
                .then((r) => r.json())
                .then((data) => {
                    if (data.routes?.[0]?.geometry?.coordinates) {
                        const coords: [number, number][] = data.routes[0].geometry.coordinates.map(
                            ([lng, lat]: [number, number]) => [lat, lng],
                        );
                        routeRef.current = L.polyline(coords, {
                            color: "#FFD200",
                            weight: 4,
                            opacity: 0.9,
                        }).addTo(map);

                        map.fitBounds(routeRef.current.getBounds(), { padding: [40, 40] });

                        // Stuur route-info terug naar parent
                        const route = data.routes[0];
                        onRouteCalculated?.({
                            distance_km: Math.round(route.distance / 100) / 10,
                            duration_min: Math.round(route.duration / 60),
                        });
                    }
                })
                .catch(() => {
                    // Bij fout: zoom gewoon naar de twee punten
                    const bounds = L.latLngBounds([[origin.lat, origin.lng], [destination.lat, destination.lng]]);
                    map.fitBounds(bounds, { padding: [60, 60] });
                });
        } else if (origin) {
            map.setView([origin.lat, origin.lng], 14);
        } else if (destination) {
            map.setView([destination.lat, destination.lng], 14);
        } else {
            map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
        }
    }, [origin, destination]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ background: "#141414" }}
        />
    );
}
