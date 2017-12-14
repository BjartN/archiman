export const DEPS =
    [
        { id: 1, "name": "Graphs", "size": 3938, "imports": ["MetOcean.Core"], edgeTo: [4] },
        { id: 2, "name": "Table", "size": 3812, "imports": ["MetOcean.Core"], edgeTo: [4] },
        { id: 3, "name": "ADCP", "size": 3812, "imports": ["MetOcean.Core"], edgeTo: [4] },

        { id: 4, "name": "MetOcean.Core", "size": 3812, "imports": ["WOD"], edgeTo: [5] },
        { id: 5, "name": "WOD", "size": 3812, "imports": ["Db2 Lyn", "CorrectedDb Lyn", "Observation Lyn"], edgeTo: [6, 7, 8] },

        { id: 6, "name": "Db2 Lyn", "size": 3812, "imports": [], edgeTo: [] },
        { id: 7, "name": "CorrectedDb Lyn", "size": 3812, "imports": [], edgeTo: [] },
        { id: 8, "name": "Observation Lyn", "size": 3812, "imports": [], edgeTo: [] },
    ]


