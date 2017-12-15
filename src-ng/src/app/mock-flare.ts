export const DEPS =
    [
        { id: 1, "name": "Graphs", edgeTo: [40], type: "service" },
        { id: 2, "name": "Table", edgeTo: [40], type: "service" },
        { id: 3, "name": "ADCP", edgeTo: [40], type: "service" },
        { id: 4, "name": "Admin FPS", edgeTo: [40], type: "service" },
        { id: 5, "name": "Admin MVC", edgeTo: [40], type: "service" },
        { id: 6, "name": "Asset Overview", edgeTo: [40], type: "service" },
        { id: 7, "name": "CMS Admin", edgeTo: [40], type: "service" },
        { id: 8, "name": "Warning", edgeTo: [40], type: "service" },
        { id: 9, "name": "WebClient", edgeTo: [40], type: "service" },
        { id: 10, "name": "SubDel", edgeTo: [40], type: "service" },
        { id: 11, "name": "WebApi", edgeTo: [40], type: "service" },
        { id: 12, "name": "Tables And Graphs", edgeTo: [40], type: "service" },
        { id: 13, "name": "Tropical", edgeTo: [40], type: "service" },
        { id: 14, "name": "Tides", edgeTo: [40], type: "service" },

        { id: 40, "name": "MetOcean.Core", edgeTo: [50], type: "lib" },
        { id: 50, "name": "WOD", edgeTo: [600, 700, 800], type: "lib" },

        { id: 600, "name": "D2 Lx", edgeTo: [], type: "db" },
        { id: 700, "name": "CorrectedDb Lx", edgeTo: [], type: "db" },
        { id: 800, "name": "Observation Lx", edgeTo: [], type: "db" },
    ]


