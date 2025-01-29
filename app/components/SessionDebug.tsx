import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";

const SessionDebug = async () => {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="bg-red-700 p-4 mt-4 rounded">
      <h2 className="text-lg font-bold mb-2">Session Debug</h2>
      <pre className="whitespace-pre-wrap font-black ">
        <p>{process.env.DATABASE_URL}</p>
        <p>{JSON.stringify(session, null, 2)} </p>
        <p>{JSON.stringify(session?.user, null, 2) || "no user"}</p>
        <p>{session ? JSON.stringify(session) : "no session"}</p>
      </pre>
    </div>
  );
};

export default SessionDebug;
