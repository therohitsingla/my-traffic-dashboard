// File: src/components/TrafficDashboard.jsx
import React, { useState, useEffect } from "react";
import "./TrafficDashboard.css";

export default function TrafficDashboard() {
  const initialCameras = [
    { id: 1, name: "Camera Feed 1", location: "5th Ave & Broadway", status: "online", quality: "4K" },
    { id: 2, name: "Camera Feed 2", location: "I-95 North Ramp", status: "online", quality: "1080p" },
    { id: 3, name: "Camera Feed 3", location: "Oak Street Elementary", status: "online", quality: "4K" },
    { id: 4, name: "Camera Feed 4", location: "City Center Plaza", status: "maintenance", quality: "4K" }
  ];

  const [cameras, setCameras] = useState(initialCameras);
  const [selectedCamera, setSelectedCamera] = useState(0);
  const [liveMetrics, setLiveMetrics] = useState({
    efficiency: 87,
    waitTime: 2.4,
    congestion: 34,
    incidents: 0.8,
    emissions: 23,
    uptime: 99.7,
    satisfaction: 4.2
  });

  // simulate real-time KPI updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        efficiency: Math.max(70, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 4)),
        waitTime: Math.max(1, Math.min(5, prev.waitTime + (Math.random() - 0.5) * 0.8)),
        congestion: Math.max(10, Math.min(80, prev.congestion + (Math.random() - 0.5) * 8)),
        incidents: Math.max(0.1, Math.min(3, prev.incidents + (Math.random() - 0.5) * 0.4)),
        emissions: Math.max(15, Math.min(40, prev.emissions + (Math.random() - 0.5) * 6)),
        uptime: Math.max(95, Math.min(100, prev.uptime + (Math.random() - 0.5) * 1)),
        satisfaction: Math.max(3, Math.min(5, prev.satisfaction + (Math.random() - 0.5) * 0.3))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { label: "Traffic Flow Efficiency", value: liveMetrics.efficiency, unit: "%", color: "emerald", trend: "+2.3%" },
    { label: "Avg. Wait Time", value: liveMetrics.waitTime, unit: "min", color: "blue", trend: "-0.8min" },
    { label: "Congestion Level", value: liveMetrics.congestion, unit: "%", color: "amber", trend: "+5.2%" },
    { label: "Incident Response Time", value: liveMetrics.incidents, unit: "min", color: "red", trend: "-0.3min" },
    { label: "Emission Reduction", value: liveMetrics.emissions, unit: "%", color: "green", trend: "+1.7%" },
    { label: "System Uptime", value: liveMetrics.uptime, unit: "%", color: "purple", trend: "+0.1%" },
    { label: "User Satisfaction", value: liveMetrics.satisfaction, unit: "/5", color: "indigo", trend: "+0.2" }
  ];

  const editCameraName = index => {
    const newName = prompt("Enter new camera name:", cameras[index].name);
    if (newName) {
      const updated = [...cameras];
      updated[index].name = newName;
      setCameras(updated);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Traffic Management Dashboard</h1>
      </header>
      <div className="dashboard-body">
        {/* Left: Video + Cameras (scrolls with right) */}
        <div className="video-section">
          <div className="video-panel">
            <video
              className="video-player"
              controls
              poster={`/thumb${selectedCamera + 1}.jpg`}
            >
              <source src="/sample-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="live-indicator-top">LIVE</div>
            <div className="camera-name-editable">
              {cameras[selectedCamera].name}
              <button className="edit-btn" onClick={() => editCameraName(selectedCamera)}>✏️</button>
            </div>
          </div>
          <section className="camera-list">
            <h2>📹 Camera Feeds</h2>
            <div className="camera-grid">
              {cameras.map((cam, i) => (
                <div
                  key={cam.id}
                  onClick={() => setSelectedCamera(i)}
                  className={`camera-item ${selectedCamera === i ? 'selected' : ''}`}
                >
                  <img src={`/thumb${i + 1}.jpg`} alt={cam.name} />
                  <div className="camera-label">
                    {cam.name}
                    <button
                      className="edit-btn-small"
                      onClick={e => { e.stopPropagation(); editCameraName(i); }}
                    >✏️</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: KPIs */}
        <aside className="sidebar">
          <h2>📊 Performance Metrics</h2>
          <div className="kpi-list">
            {kpis.map((kpi, idx) => (
              <div key={idx} className={`kpi-card ${kpi.color}`}>  
                <div className="kpi-header">
                  <span className="kpi-trend">{kpi.trend}</span>
                </div>
                <p className="kpi-label">{kpi.label}</p>
                <p className="kpi-value">
                  {kpi.value.toFixed(1)}<span className="kpi-unit">{kpi.unit}</span>
                </p>
                <div className="kpi-bar-bg">
                  <div
                    className="kpi-bar-fill"
                    style={{ width: `${kpi.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}