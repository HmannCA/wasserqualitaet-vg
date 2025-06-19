import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Users, Beaker, Building2, MessageSquare, Send, User, Calendar, ThumbsUp, Filter, Droplets, Activity, Database, Shield, Cloud, BarChart3, Info, CheckCircle2, AlertCircle, X, Menu, Sun, Moon } from 'lucide-react';

function App() {
  const [expandedSections, setExpandedSections] = useState({});
  const [userLevel, setUserLevel] = useState('verwaltung');
  const [activeStep, setActiveStep] = useState(0);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedComments = localStorage.getItem('waterQualityComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const saveComment = (stepId, sectionId) => {
    const commentKey = `${stepId}-${sectionId}`;
    if (newComment[commentKey]?.trim()) {
      const updatedComments = {
        ...comments,
        [commentKey]: [
          ...(comments[commentKey] || []),
          {
            text: newComment[commentKey],
            author: 'Aktueller Nutzer',
            timestamp: new Date().toLocaleString('de-DE'),
            level: userLevel
          }
        ]
      };
      setComments(updatedComments);
      localStorage.setItem('waterQualityComments', JSON.stringify(updatedComments));
      setNewComment({ ...newComment, [commentKey]: '' });
    }
  };

  const toggleSection = (stepId, sectionId) => {
    const key = `${stepId}-${sectionId}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getLevelIcon = (level) => {
    switch(level) {
      case 'experte': return <Beaker className="w-4 h-4" />;
      case 'verwaltung': return <Building2 className="w-4 h-4" />;
      case 'buerger': return <Users className="w-4 h-4" />;
      default: return null;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'experte': return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20';
      case 'verwaltung': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
      case 'buerger': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
      default: return '';
    }
  };

  const steps = [
    {
      id: 'dateneingabe',
      title: 'Datenaufnahme & Streaming',
      icon: <Database className="w-6 h-6" />,
      intro: {
        experte: 'Implementierung einer robusten Echtzeit-Datenaufnahme-Pipeline mit Apache Kafka und ereignisgesteuerter Architektur.',
        verwaltung: 'Einrichtung eines Systems zur automatischen Erfassung der Sensordaten aus den Messstationen.',
        buerger: 'Die Messstationen senden ihre Daten automatisch an unser System.'
      },
      sections: [
        {
          id: 'architecture',
          title: 'Systemarchitektur',
          content: {
            experte: (
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Technische Komponenten</h5>
                  <pre className="text-sm overflow-x-auto">
{`# Apache Kafka Setup für Datenstreaming
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.4.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      
  kafka:
    image: confluentinc/cp-kafka:7.4.0
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092`}
                  </pre>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Datenfluss-Diagramm</h5>
                  <div className="flex items-center justify-center space-x-4 my-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <Activity className="w-8 h-8" />
                      </div>
                      <p className="text-sm mt-2">Sensoren</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <Database className="w-8 h-8" />
                      </div>
                      <p className="text-sm mt-2">Kafka</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white">
                        <Shield className="w-8 h-8" />
                      </div>
                      <p className="text-sm mt-2">Validierung</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            verwaltung: (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Systemübersicht</h5>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Automatische Datenerfassung alle 60 Minuten</li>
                    <li>Sichere Übertragung über verschlüsselte Verbindungen</li>
                    <li>Zwischenspeicherung bei Verbindungsproblemen</li>
                    <li>Automatische Wiederholung bei Übertragungsfehlern</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Vorteile für die Verwaltung</h5>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Keine manuelle Dateneingabe erforderlich</li>
                    <li>Echtzeit-Überwachung möglich</li>
                    <li>Automatische Fehlererkennung</li>
                    <li>Zentrale Datenverwaltung</li>
                  </ul>
                </div>
              </div>
            ),
            buerger: (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">So funktioniert's</h5>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">1</div>
                      <div>
                        <p className="font-medium">Messung im See</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Die Sensoren messen stündlich Temperatur, pH-Wert und weitere Werte</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">2</div>
                      <div>
                        <p className="font-medium">Automatische Übertragung</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Die Daten werden sicher an unsere Server gesendet</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">3</div>
                      <div>
                        <p className="font-medium">Speicherung</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Alle Messwerte werden sicher gespeichert</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
      ]
    },
    {
      id: 'validierung',
      title: 'Mehrstufige Datenvalidierung',
      icon: <Shield className="w-6 h-6" />,
      intro: {
        experte: 'Implementierung eines vierstufigen hierarchischen Validierungsansatzes mit Machine Learning Integration.',
        verwaltung: 'Automatische Überprüfung der Messdaten auf Plausibilität und technische Fehler.',
        buerger: 'Die Messwerte werden automatisch auf ihre Richtigkeit überprüft.'
      },
      sections: [
        {
          id: 'validation-levels',
          title: 'Validierungsstufen',
          content: {
            experte: (
              <div className="space-y-4">
                {/* Wissenschaftliche Erklärung */}
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Hierarchischer Validierungsansatz</h5>
                  <p className="text-sm mb-3">
                    Unser System folgt einem mehrstufigen, hierarchischen Validierungsansatz, wie er von führenden Umweltbehörden (z.B. US-EPA) entwickelt und in der wissenschaftlichen Literatur empfohlen wird. Dieser Ansatz kombiniert automatisierte Tests mit Expertenwissen, um eine hohe Datenqualität zu gewährleisten.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0 font-bold">1</div>
                      <div>
                        <p className="font-medium">Screening & Bereichsprüfungen</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Jeder eingehende Messwert wird in Echtzeit auf die Einhaltung physikalischer und betrieblicher Grenzwerte sowie auf plausible Änderungsraten geprüft. Dies dient als erste Verteidigungslinie gegen grobe Sensorfehler.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0 font-bold">2</div>
                      <div>
                        <p className="font-medium">Statistische Anomalieerkennung</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Mithilfe von Machine-Learning-Verfahren, wie dem Isolation Forest Algorithmus aus der Bibliothek <strong>PyOD</strong>, werden subtile Ausreißer und Anomalien im Datenstrom erkannt, die einfache Bereichsprüfungen nicht finden würden. Solche Verfahren können eine Genauigkeit von über 98% erreichen.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0 font-bold">3</div>
                      <div>
                        <p className="font-medium">Prozessbasierte Plausibilisierung</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Es werden Zusammenhänge zwischen verschiedenen Parametern geprüft. Beispielsweise wird die Sauerstoffsättigung in Relation zur Wassertemperatur gesetzt, um biologisch oder physikalisch unplausible Kombinationen zu identifizieren.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white flex-shrink-0 font-bold">4</div>
                      <div>
                        <p className="font-medium">Expertenprüfung</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Alle als "verdächtig" markierten Datenpunkte werden zur manuellen Überprüfung durch Fachexperten in dieser Anwendung visualisiert und können hier kommentiert und final bewertet werden.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Aufklappbarer Python-Code */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <details>
                    <summary className="px-4 py-3 font-medium cursor-pointer flex justify-between items-center">
                      <span>Python Implementierungsbeispiel</span>
                      <ChevronDown className="w-5 h-5 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 border-t dark:border-gray-700">
                      <pre className="text-sm overflow-x-auto mt-4">
            {`import pandas as pd
            import numpy as np
            from scipy import stats
            from pyod.models.iforest import IForest

            class WaterQualityValidator:
                def __init__(self):
                    self.anomaly_detector = IForest(contamination=0.05)
                    
                def validate_range(self, param, value, limits):
                    """Stufe 2: Bereichsvalidierung"""
                    if limits['min'] <= value <= limits['max']:
                        return 'PASS', 1
                    elif value < limits['critical_min'] or value > limits['critical_max']:
                        return 'FAIL', 4
                    else:
                        return 'SUSPECT', 3
                        
                def validate_rate_of_change(self, series, max_change):
                    """Stufe 3: Änderungsratenprüfung"""
                    changes = series.diff()
                    spikes = changes[abs(changes) > max_change]
                    return len(spikes) == 0
                    
                def detect_anomalies(self, data):
                    """Stufe 4: ML-basierte Anomalieerkennung"""
                    self.anomaly_detector.fit(data)
                    predictions = self.anomaly_detector.predict(data)
                    return predictions  # 0 = normal, 1 = anomaly`}
                      </pre>
                    </div>
                  </details>
                </div>
              </div>
            ),
            verwaltung: (
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Automatische Qualitätsprüfungen</h5>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Technische Funktionsprüfung der Sensoren</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Plausibilitätsprüfung der Messwerte</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Vergleich mit historischen Daten</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>Erkennung von Sensorausfällen</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Qualitätskennzeichnung</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-100 dark:bg-green-900/30 rounded">
                      <span>✓ Validierte Daten</span>
                      <span className="text-sm font-medium">Grün</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                      <span>? Unsichere Daten</span>
                      <span className="text-sm font-medium">Gelb</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-100 dark:bg-red-900/30 rounded">
                      <span>✗ Fehlerhafte Daten</span>
                      <span className="text-sm font-medium">Rot</span>
                    </div>
                  </div>
                </div>
              </div>
            ),
            buerger: (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Qualitätssicherung Ihrer Daten</h5>
                  <p className="text-sm mb-3">Wir prüfen jeden Messwert automatisch:</p>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Ist der Wert realistisch?</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">z.B. pH-Wert zwischen 6.5 und 8.5</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Activity className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Hat sich der Wert plötzlich stark verändert?</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Große Sprünge werden erkannt</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Funktioniert der Sensor richtig?</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Technische Fehler werden bemerkt</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
      ]
    },
    {
      id: 'aggregation',
      title: 'Tageskonsolidierung',
      icon: <BarChart3 className="w-6 h-6" />,
      intro: {
        experte: 'Wissenschaftlich fundierte statistische Aggregation mit parameterspezifischen Kennwerten.',
        verwaltung: 'Zusammenfassung der stündlichen Messwerte zu aussagekräftigen Tageswerten.',
        buerger: 'Aus den stündlichen Messungen berechnen wir übersichtliche Tageswerte.'
      },
      sections: [
        {
          id: 'consolidation-methods',
          title: 'Konsolidierungsmethoden',
          content: {
            experte: (
              <div className="space-y-4">
                {/* Wissenschaftliche Erklärung */}
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Parameterspezifische Aggregation</h5>
                  <p className="text-sm mb-3">
                    Die Zusammenfassung von Stunden- zu Tageswerten erfolgt nicht pauschal, sondern nach parameterspezifischen, wissenschaftlich fundierten Regeln, um die Aussagekraft der Kennwerte zu maximieren.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                      <li><strong>Temperatur:</strong> Hier sind Mittel-, Minimal- und Maximalwerte relevant, um die Tagesschwankung (Diurnale Amplitude) zu erfassen.</li>
                      <li><strong>pH-Wert:</strong> Als logarithmische Größe wird für den pH-Wert primär der <strong>Median</strong> als robuster Mittelwert verwendet, da er weniger anfällig für Extremwerte ist.</li>
                      <li><strong>Gelöster Sauerstoff:</strong> Der <strong>Minimalwert</strong> ist oft der kritischste Indikator für aquatischen Stress, weshalb er gesondert ausgewiesen wird.</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Regeln zur Datenverfügbarkeit</h5>
                  <p className="text-sm mb-3">
                    Um die Repräsentativität der Tageswerte sicherzustellen, werden international etablierte Regeln angewendet:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Ein Tageswert wird nur berechnet, wenn mindestens <strong>75% der Stundenwerte</strong> (18 von 24) innerhalb des Tages als valide eingestuft wurden.</li>
                      <li>Kleinere Datenlücken von weniger als 3 Stunden können durch lineare Interpolation gefüllt werden, werden aber entsprechend gekennzeichnet.</li>
                  </ul>
                </div>

                {/* Aufklappbarer Python-Code */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <details>
                    <summary className="px-4 py-3 font-medium cursor-pointer flex justify-between items-center">
                      <span>Python Implementierungsbeispiel</span>
                      <ChevronDown className="w-5 h-5 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 border-t dark:border-gray-700">
                      <pre className="text-sm overflow-x-auto mt-4">
            {`def aggregate_daily_values(hourly_data, parameter):
                """Wissenschaftlich fundierte Tagesaggregation"""
                
                if parameter == 'temperature':
                    return {
                        'mean': hourly_data.mean(),
                        'min': hourly_data.min(),
                        'max': hourly_data.max(),
                        'std': hourly_data.std(),
                        'range': hourly_data.max() - hourly_data.min()
                    }
                
                elif parameter == 'ph':
                    # pH als logarithmische Größe -> Median bevorzugt
                    return {
                        'median': hourly_data.median(),
                        'mean': hourly_data.mean(),
                        'min': hourly_data.min(),
                        'max': hourly_data.max(),
                        'iqr': hourly_data.quantile(0.75) - hourly_data.quantile(0.25)
                    }
                
                elif parameter == 'dissolved_oxygen':
                    # Minimum kritisch für aquatisches Leben
                    return {
                        'mean': hourly_data.mean(),
                        'min': hourly_data.min(),
                        'min_time': hourly_data.idxmin(),
                        'percent_below_5mg': (hourly_data < 5).sum() / len(hourly_data) * 100
                    }`}
                      </pre>
                    </div>
                  </details>
                </div>
              </div>
            ),
            verwaltung: (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Berechnete Tageswerte</h5>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Parameter</th>
                        <th className="text-left py-2">Kennwerte</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Temperatur</td>
                        <td className="py-2">Mittelwert, Min, Max</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">pH-Wert</td>
                        <td className="py-2">Median, Bereich</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Sauerstoff</td>
                        <td className="py-2">Mittelwert, Minimum</td>
                      </tr>
                      <tr>
                        <td className="py-2">Trübung</td>
                        <td className="py-2">Median, Maximum</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Wichtige Hinweise</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Tageswerte nur bei ausreichender Datenverfügbarkeit</li>
                    <li>Extremwerte werden gesondert dokumentiert</li>
                    <li>Unsichere Werte fließen nicht in Berechnung ein</li>
                  </ul>
                </div>
              </div>
            ),
            buerger: (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Von Stunden- zu Tageswerten</h5>
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <p className="font-medium text-sm">Beispiel Wassertemperatur:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        24 Messungen: 8.2°C, 8.3°C, 8.5°C, ... 12.1°C
                      </p>
                      <p className="text-sm mt-2">
                        <span className="font-medium">Tageswert:</span> Durchschnitt 10.2°C, 
                        Min 8.2°C, Max 12.1°C
                      </p>
                    </div>
                    <p className="text-sm">
                      So bekommen Sie auf einen Blick die wichtigsten Informationen des Tages!
                    </p>
                  </div>
                </div>
              </div>
            )
          }
        }
      ]
    },
    {
      id: 'quality-flags',
      title: 'Qualitätskennzeichnung',
      icon: <CheckCircle2 className="w-6 h-6" />,
      intro: {
        experte: 'Implementierung internationaler Standards (QARTOD, SeaDataNet) für Datenqualitätsflags.',
        verwaltung: 'Klare Kennzeichnung der Datenqualität für verlässliche Entscheidungen.',
        buerger: 'Jeder Messwert bekommt eine Qualitätsbewertung, damit Sie wissen, wie verlässlich er ist.'
      },
      sections: [
        {
          id: 'flagging-system',
          title: 'Qualitätssystem',
          content: {
            experte: (
              <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Qualitäts-Flags nach QARTOD-Standard</h5>
                      <p className="text-sm mb-3">
                          Unser System orientiert sich an internationalen Standards zur Qualitätskennzeichnung wie <strong>QARTOD</strong> (Quality Assurance of Real-Time Oceanographic Data) und <strong>SeaDataNet</strong>, um die Interoperabilität und Vergleichbarkeit der Daten zu gewährleisten. Die einfachen Farb-Codes der App lassen sich wie folgt zuordnen:
                      </p>
                      <div className="space-y-2">
                          <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center font-bold flex-shrink-0">1</div>
                              <div>
                                  <p className="font-medium">Pass (Grün)</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">Daten haben alle automatischen QC-Tests bestanden.</p>
                              </div>
                          </div>
                          <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-yellow-500 text-white rounded flex items-center justify-center font-bold flex-shrink-0">3</div>
                              <div>
                                  <p className="font-medium">Suspect (Gelb)</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">Potenziell fehlerhafte Daten, die einer Expertenprüfung bedürfen. Die Daten sind für Trendanalysen, aber nicht für Grenzwertüberprüfungen geeignet.</p>
                              </div>
                          </div>
                          <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center font-bold flex-shrink-0">4</div>
                              <div>
                                  <p className="font-medium">Fail (Rot)</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">Die Daten haben kritische Tests nicht bestanden und sollten nicht verwendet werden.</p>
                              </div>
                          </div>
                          <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gray-500 text-white rounded flex items-center justify-center font-bold flex-shrink-0">2</div>
                              <div>
                                  <p className="font-medium">Not Evaluated</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">Daten, die noch keinem QC-Test unterzogen wurden (z.B. bei Systemausfall).</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            ),
            verwaltung: (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Qualitätsstufen für Ihre Entscheidungen</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                      <p className="font-medium">✓ Verwendbar für alle Zwecke</p>
                      <p className="text-sm">Berichte, Analysen, Veröffentlichungen</p>
                    </div>
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                      <p className="font-medium">⚠ Mit Vorsicht verwenden</p>
                      <p className="text-sm">Trends ok, aber keine kritischen Entscheidungen</p>
                    </div>
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded">
                      <p className="font-medium">✗ Nicht verwenden</p>
                      <p className="text-sm">Nur zur Dokumentation von Problemen</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            buerger: (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Vertrauen Sie unseren Daten</h5>
                  <div className="text-center my-4">
                    <div className="inline-flex items-center space-x-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm mt-1">Gut</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm mt-1">Unsicher</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <X className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm mt-1">Fehlerhaft</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-center">
                    Jeder Wert wird geprüft und gekennzeichnet!
                  </p>
                </div>
              </div>
            )
          }
        }
      ]
    },
    {
      id: 'api-export',
      title: 'Datenbereitstellung & API',
      icon: <Cloud className="w-6 h-6" />,
      intro: {
        experte: 'RESTful API mit OGC SensorThings Standard und JSON/WaterML 2.0 Export.',
        verwaltung: 'Automatisierte Bereitstellung der validierten Daten für verschiedene Nutzergruppen.',
        buerger: 'Die geprüften Daten werden öffentlich und kostenlos zur Verfügung gestellt.'
      },
      sections: [
        {
          id: 'api-design',
          title: 'Schnittstellen & Formate',
          content: {
            experte: (
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">API Endpoints</h5>
                  <pre className="text-sm overflow-x-auto">
{`# FastAPI Implementation
from fastapi import FastAPI, Query
from datetime import datetime, date

app = FastAPI(title="Water Quality API")

@app.get("/api/v1/observations")
async def get_observations(
    station_id: str,
    parameter: str,
    start_date: date,
    end_date: date,
    quality_flags: List[int] = Query([1,2,3])
):
    """OGC SensorThings konformer Endpoint"""
    return {
        "@iot.count": 1440,
        "value": [
            {
                "@iot.id": "obs123",
                "phenomenonTime": "2025-01-20T10:00:00Z",
                "result": 7.8,
                "resultQuality": {
                    "qartod_flag": 1,
                    "validation_level": 2
                }
            }
        ]
    }`}
                  </pre>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Unterstützte Standards</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>OGC SensorThings API 1.1</li>
                    <li>WaterML 2.0 für Zeitreihen</li>
                    <li>JSON-LD mit schema.org Vokabular</li>
                    <li>CSV mit standardisierten Headers</li>
                  </ul>
                </div>
              </div>
            ),
            verwaltung: (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Datenzugriff für Ihre Anwendungen</h5>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <Database className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Excel/CSV Download</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Für Berichte und Analysen</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Cloud className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Web-API</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Für automatisierte Systeme</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BarChart3 className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Dashboard</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Für visuelle Überwachung</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
            buerger: (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">So kommen Sie an die Daten</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-medium">📊 Webseite besuchen</p>
                      <p className="text-sm">Schauen Sie sich Grafiken und aktuelle Werte an</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-medium">📥 Daten herunterladen</p>
                      <p className="text-sm">Als Excel-Datei für eigene Auswertungen</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-medium">📱 App nutzen</p>
                      <p className="text-sm">Demnächst: Mobile App für unterwegs</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }
      ]
    }
  ];

  const filteredSteps = steps.filter(step => 
    step.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    step.intro[userLevel].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <Droplets className="w-8 h-8 text-blue-500" />
                <div>
                  <h1 className="text-xl font-bold">Wasserqualität Vorpommern-Greifswald</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatische Validierung & Open Data</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setUserLevel('buerger')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    userLevel === 'buerger' 
                      ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-1" />
                  Bürger
                </button>
                <button
                  onClick={() => setUserLevel('verwaltung')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    userLevel === 'verwaltung' 
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 inline mr-1" />
                  Verwaltung
                </button>
                <button
                  onClick={() => setUserLevel('experte')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    userLevel === 'experte' 
                      ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Beaker className="w-4 h-4 inline mr-1" />
                  Experte
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen`}>
          <div className="p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <nav className="space-y-2">
              {filteredSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeStep === index 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {step.icon}
                  <span className="text-sm font-medium">{step.title}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Projektfortschritt</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Konzeption</span>
                  <span className="text-green-600 dark:text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Implementierung</span>
                  <span className="text-yellow-600 dark:text-yellow-400">...</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Testing</span>
                  <span className="text-gray-400">-</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                {filteredSteps[activeStep]?.icon}
                <h2 className="text-2xl font-bold">{filteredSteps[activeStep]?.title}</h2>
              </div>
              
              <div className={`p-4 rounded-lg ${getLevelColor(userLevel)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {getLevelIcon(userLevel)}
                  <span className="text-sm font-medium">
                    {userLevel === 'experte' ? 'Expertenansicht' : 
                     userLevel === 'verwaltung' ? 'Verwaltungsansicht' : 'Bürgeransicht'}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {filteredSteps[activeStep]?.intro[userLevel]}
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-4">
              {filteredSteps[activeStep]?.sections.map((section) => {
                const isExpanded = expandedSections[`${filteredSteps[activeStep].id}-${section.id}`];
                const commentKey = `${filteredSteps[activeStep].id}-${section.id}`;
                const sectionComments = comments[commentKey] || [];
                
                return (
                  <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => toggleSection(filteredSteps[activeStep].id, section.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <div className="flex items-center space-x-3">
                        {sectionComments.length > 0 && (
                          <span className="flex items-center space-x-1 text-sm text-gray-500">
                            <MessageSquare className="w-4 h-4" />
                            <span>{sectionComments.length}</span>
                          </span>
                        )}
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6 animate-in slide-in-from-top duration-200">
                        <div className="pt-4 border-t dark:border-gray-700">
                          {section.content[userLevel]}
                        </div>
                        
                        {/* Collaboration Section */}
                        <div className="mt-6 pt-6 border-t dark:border-gray-700">
                          <button
                            onClick={() => setShowComments({ ...showComments, [commentKey]: !showComments[commentKey] })}
                            className="flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Diskussion & Zusammenarbeit ({sectionComments.length})</span>
                          </button>
                          
                          {showComments[commentKey] && (
                            <div className="mt-4 space-y-3">
                              {sectionComments.map((comment, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center space-x-2">
                                      <User className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium">{comment.author}</span>
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(comment.level)}`}>
                                        {comment.level === 'experte' ? 'Experte' : 
                                         comment.level === 'verwaltung' ? 'Verwaltung' : 'Bürger'}
                                      </span>
                                    </div>
                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-sm">{comment.text}</p>
                                </div>
                              ))}
                              
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  placeholder="Kommentar hinzufügen..."
                                  value={newComment[commentKey] || ''}
                                  onChange={(e) => setNewComment({ ...newComment, [commentKey]: e.target.value })}
                                  onKeyPress={(e) => e.key === 'Enter' && saveComment(filteredSteps[activeStep].id, section.id)}
                                  className="flex-1 px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600"
                                />
                                <button
                                  onClick={() => saveComment(filteredSteps[activeStep].id, section.id)}
                                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                  activeStep === 0 
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Vorheriger Schritt</span>
              </button>
              
              <div className="flex space-x-2">
                {filteredSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === activeStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setActiveStep(Math.min(filteredSteps.length - 1, activeStep + 1))}
                disabled={activeStep === filteredSteps.length - 1}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                  activeStep === filteredSteps.length - 1 
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <span>Nächster Schritt</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;