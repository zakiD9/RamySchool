import { useEffect } from "react";
import PresencesTable from "./PresencesTable";
import { useStudentsStore } from "@/stores/studentsStore";
import { useSessionStore } from "@/stores/sessionsStore"; // ✅ import sessions store

export default function PresencesSection() {
  const { students, fetchStudents, loading: studentsLoading, error: studentsError } = useStudentsStore();
  const { sessions, fetchSessions, loading: sessionsLoading, error: sessionsError } = useSessionStore();
  // Fetch both students and sessions
  useEffect(() => {
    fetchStudents();
    fetchSessions();
  }, [fetchStudents, fetchSessions]);

  const loading = studentsLoading || sessionsLoading;
  const error = studentsError || sessionsError;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Presences</h2>

      {loading && <p className="text-gray-500">Loading presences...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && students.length > 0 && sessions.length > 0 && (
        <PresencesTable data={students} />
      )}

      {!loading && !error && students.length === 0 && (
        <p className="text-gray-500">No students found.</p>
      )}

      {!loading && !error && students.length > 0 && sessions.length === 0 && (
        <p className="text-gray-500">No sessions found.</p>
      )}
    </div>
  );
}
