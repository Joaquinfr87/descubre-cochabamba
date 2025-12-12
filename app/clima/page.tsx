"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, Sun, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// OpenMeteo Type Definitions
interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

const getWeatherDescription = (code: number) => {
  if (code === 0) return "Despejado";
  if (code >= 1 && code <= 3) return "Parcialmente Nublado";
  if (code >= 45 && code <= 48) return "Niebla";
  if (code >= 51 && code <= 57) return "Llovizna";
  if (code >= 61 && code <= 67) return "Lluvia";
  if (code >= 71 && code <= 77) return "Nieve";
  if (code >= 80 && code <= 82) return "Lluvia Intensa";
  if (code >= 95) return "Tormenta";
  return "Desconocido";
};

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="h-16 w-16 text-yellow-500" />;
  if (code >= 1 && code <= 3) return <Cloud className="h-16 w-16 text-gray-400" />;
  if (code >= 51) return <Droplets className="h-16 w-16 text-blue-400" />;
  return <Sun className="h-16 w-16 text-yellow-500" />;
};

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Cochabamba Coordinates
  // approx: -17.3935, -66.1570
  const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=-17.3935&longitude=-66.1570&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Clima en Cochabamba</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Consulta el tiempo actual y el pronóstico para disfrutar de la "Ciudad de la Eterna Primavera".
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : weather ? (
          <div className="max-w-4xl mx-auto">
            {/* Current Weather */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mb-12 shadow-xl border-none bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
                <CardContent className="p-8 md:p-12">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex flex-col items-center md:items-start text-center md:text-left">
                       <span className="text-lg font-medium text-muted-foreground mb-1">Ahora</span>
                       <h2 className="text-6xl font-bold text-foreground mb-2">
                         {Math.round(weather.current.temperature_2m)}°C
                       </h2>
                       <p className="text-xl text-primary font-medium">
                         {getWeatherDescription(weather.current.weather_code)}
                       </p>
                     </div>
                     
                     <div className="flex items-center justify-center p-6 bg-white dark:bg-black/20 rounded-full shadow-sm">
                       {getWeatherIcon(weather.current.weather_code)}
                     </div>

                     <div className="grid grid-cols-2 gap-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                           <Wind className="h-6 w-6 text-muted-foreground" />
                           <span className="text-lg font-bold">{weather.current.wind_speed_10m} km/h</span>
                           <span className="text-xs text-muted-foreground uppercase">Viento</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <Droplets className="h-6 w-6 text-muted-foreground" />
                           <span className="text-lg font-bold">{weather.current.relative_humidity_2m}%</span>
                           <span className="text-xs text-muted-foreground uppercase">Humedad</span>
                        </div>
                     </div>
                   </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Daily Forecast */}
            <h3 className="text-2xl font-bold mb-6">Pronóstico (3 Días)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {weather.daily.time.slice(1, 4).map((date, index) => (
                 <motion.div
                   key={date}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: index * 0.1 }}
                 >
                   <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                     <CardContent className="p-6 flex flex-col items-center text-center">
                       <span className="text-muted-foreground mb-4 font-medium">
                         {new Date(date).toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric' })}
                       </span>
                       <div className="mb-4">
                         {getWeatherIcon(weather.daily.weather_code[index + 1])}
                       </div>
                       <div className="flex items-center gap-4 text-lg font-bold">
                         <span className="text-orange-500">{Math.round(weather.daily.temperature_2m_max[index + 1])}°</span>
                         <span className="text-blue-500">{Math.round(weather.daily.temperature_2m_min[index + 1])}°</span>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>
               ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500">
            No se pudo cargar la información del clima. Por favor intenta más tarde.
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
