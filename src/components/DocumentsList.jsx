export default function DocumentsList({ documents }) {
  if (!documents || !documents.length) {
    return <p>Aucun document disponible.</p>;
  }

  return (
    <div style={{ marginTop: "30px" }} className="card">
      <h2>📄 Documents de campagne</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {documents.map(doc => (
          <li
            key={doc.id_document}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#fafafa"
            }}
          >
            <p>
              <strong>Candidat :</strong> {doc.id_candidat}
            </p>

            <p>
              <strong>Fichier :</strong> {doc.filename}
            </p>

            <a
              href={doc.download_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "5px",
                padding: "6px 12px",
                backgroundColor: "#4f46e5",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px"
              }}
            >
              Télécharger
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
