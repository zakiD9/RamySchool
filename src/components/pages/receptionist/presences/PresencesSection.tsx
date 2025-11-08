import { useEffect,  } from "react";
import PresenceDialog from "./PresencePopUp";
import PresencesTable from "./PresencesTable";
import { usePresenceStore } from "@/stores/presencesStore";


export default function PresencesSection() {

  const { presences, fetchPresences, loading, error } = usePresenceStore();

  useEffect(() => {
    fetchPresences();
  }, [fetchPresences]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Presences</h2>

      <div className="flex justify-between items-center">
        <PresenceDialog mode="add" />
      </div>

      {loading && <p className="text-gray-500">Loading presences...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && presences.length > 0 && (
        <PresencesTable data={presences} />
      )}

      {!loading && !error && presences.length === 0 && (
        <p className="text-gray-500">No presences found.</p>
      )}
    </div>
  );
}
