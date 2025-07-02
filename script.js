let viz;

const config = {
  container_id: "viz", // WAJIB: format snake_case
 url: "neo4j+s://d121d14f.databases.neo4j.io",
 user: "neo4j",
 password: "ouf1CK1PjyiyjR3ykZZiMjaobSbgDrmq8zYT4H7Q92I",

  labels: {
    Klub: { label: "nama" },
    Liga: { label: "nama" },
    Musim: { label: "nama" },
    Kejuaraan: { label: "nama" },
    Kompetisi: { label: "nama" }
  },

  relationships: {
    BERMAIN_DI: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        color: { color: "blue", highlight: "darkblue", hover: "darkblue" }
      }
    },
    BERPARTISIPASI: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        color: { color: "red", highlight: "darkred", hover: "darkred" }
      }
    },
    SERIE_A: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        color: { color: "green", highlight: "darkgreen", hover: "darkgreen" }
      }
    },
    BUNDESLIGA: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        color: { color: "gold", highlight: "orange", hover: "orange" }
      }
    },
    MUSIM: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        color: { color: "#FF69B4", highlight: "#ff1493", hover: "#ff1493" }
      }
    },
    LIGA_NASIONAL: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        color: { color: "#6a5acd", highlight: "#483d8b", hover: "#483d8b" }
      }
    },
    KEJUARAAN_EROPA: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        color: { color: "#ff9900", highlight: "#cc7a00", hover: "#cc7a00" }
      }
    },
    '*': {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        color: { color: "#999", highlight: "#666", hover: "#666" }
      }
    }
  },

  initial_cypher: "MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 100",

  visConfig: {
    nodes: {
      shape: 'dot',
      size: 16,
      scaling: { min: 10, max: 30 },
      font: { size: 14, face: 'Arial', color: '#333' }
    },
    edges: {
      smooth: { enabled: true, type: 'dynamic' },
      arrows: { to: { enabled: true, scaleFactor: 0.8 } }
    },
    physics: {
      enabled: true,
      stabilization: true
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      multiselect: true
    }
  }
};

function renderCypher(query) {
  viz.renderWithCypher(query);
}

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("cypher");
  const btn = document.getElementById("reload");

  input.value = config.initial_cypher;

  viz = new NeoVis.default(config);
  viz.render();

  btn.addEventListener("click", () => {
    const q = input.value.trim();
    if (q) renderCypher(q);
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      btn.click();
    }
  });
});
