import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

const API_URL = "https://a3n8zcc4n2.execute-api.eu-west-3.amazonaws.com";

export default function AdminDocuments({ candidats, onDocumentAdded }) {
  const [selectedCandidat, setSelectedCandidat] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCandidat || !file) {
      setMessage("❌ Candidat et fichier requis");
      return;
    }

    try {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      // Lecture du fichier en base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Content = reader.result.split(",")[1];

        const res = await fetch(`${API_URL}/documents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            id_candidat: selectedCandidat,
            filename: file.name,
            file_content: base64Content
          })
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("✅ Document envoyé avec succès");
          setFile(null);
          if (onDocumentAdded) onDocumentAdded();
        } else {
          setMessage(`❌ ${data.message}`);
        }
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l’upload");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📄 Administration — Ajouter un document</h2>

      <form onSubmit={handleSubmit}>
        {/* Sélection candidat */}
        <select
          value={selectedCandidat}
          onChange={(e) => setSelectedCandidat(e.target.value)}
          required
        >
          <option value="">-- Sélectionner un candidat --</option>
          {candidats.map((c) => (
            <option key={c.id_candidat} value={c.id_candidat}>
              {c.id_candidat}
            </option>
          ))}
        </select>

        <br /><br />

        {/* Fichier */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <br /><br />

        <button type="submit">Uploader</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
