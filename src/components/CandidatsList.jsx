export default function CandidatsList({ candidats }) {
  if (!candidats.length) {
    return <p>Aucun candidat pour le moment.</p>;
  }

  return (
    <div className="card">
      <h2>👤 Candidats</h2>

      <div className="candidat-grid">
        {candidats.map((c) => (
          <div key={c.id_candidat} className="candidat-card">
            <strong>{c.id_candidat}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
