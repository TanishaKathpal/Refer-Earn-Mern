import { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [userData, setUserData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl"></div>

      {/* Main Soft Card */}
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-sm rounded-2xl p-10 border border-gray-200 shadow-sm relative">
        {screen === "home" && (
          <Home
            onCreate={() => setScreen("register")}
            onReferral={() => setScreen("referral")}
            userData={userData}
          />
        )}

        {screen === "register" && (
          <Register
            onBack={() => setScreen("home")}
            saveUser={(u) => setUserData(u)}
          />
        )}

        {screen === "referral" && (
          <Referral onBack={() => setScreen("home")} knownUser={userData} />
        )}
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-xl p-10 shadow-md border border-gray-200">
      {children}
    </div>
  );
}

function Home({ onCreate, onReferral, userData }) {
  return (
    <Card>
      <h1 className="text-4xl font-semibold text-gray-900 text-center">
        Refer & Earn
      </h1>

      <p className="text-center text-gray-600 mt-3 text-base">
        Earn rewards by referring others.
      </p>

      <div className="mt-10 space-y-4">
        <button
          onClick={onCreate}
          className="w-full bg-black text-white py-4 rounded-lg text-base hover:bg-gray-900 transition"
        >
          Create account
        </button>

        <button
          onClick={onReferral}
          className="w-full bg-white border border-gray-300 py-4 rounded-lg text-base hover:bg-gray-50 transition"
        >
          Apply referral
        </button>
      </div>

      {userData && (
        <div className="mt-10 text-center text-base text-gray-700">
          <div className="font-medium">Last registered:</div>
          <div>{userData.email}</div>
          <div className="mt-1">
            Referral Code: <b>{userData.referralCode}</b>
          </div>
        </div>
      )}
    </Card>
  );
}

function Register({ onBack, saveUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);

  const register = async () => {
    setErr(null);

    try {
      const res = await fetch(
        "https://refer-earn-mern.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) return setErr(data.message);

      setResult(data.user);
      saveUser(data.user);
    } catch {
      setErr("Server error.");
    }
  };

  return (
    <Card>
      <button onClick={onBack} className="text-base text-gray-500 hover:underline">
        ← Back
      </button>

      <h2 className="text-3xl font-semibold text-gray-900 mt-4">
        Create Account
      </h2>

      <div className="mt-8 space-y-5">
        <input
          placeholder="Full name"
          className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email address"
          className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-black text-white py-4 rounded-lg text-base hover:bg-gray-900 transition"
        >
          Create account
        </button>

        {err && <p className="text-red-600 text-base">{err}</p>}

        {result && (
          <div className="text-green-700 text-base mt-3 space-y-2">
            <p>User ID: <b>{result._id}</b></p>
            <p>Referral Code: <b>{result.referralCode}</b></p>
          </div>
        )}
      </div>
    </Card>
  );
}

function Referral({ onBack, knownUser }) {
  const [userId, setUserId] = useState("");
  const [referralCode, setReferralCode] = useState(
    knownUser?.referralCode || ""
  );
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);

  const applyReferral = async () => {
    setErr(null);

    try {
      const res = await fetch(
        "https://refer-earn-mern.onrender.com/api/apply-referral",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, referralCode }),
        }
      );

      const data = await res.json();
      if (!res.ok) return setErr(data.message);

      setResult(data);
    } catch {
      setErr("Server error");
    }
  };

  return (
    <Card>
      <button onClick={onBack} className="text-base text-gray-500 hover:underline">
        ← Back
      </button>

      <h2 className="text-3xl font-semibold text-gray-900 mt-4">
        Apply Referral
      </h2>

      <div className="mt-8 space-y-5">
        <input
          placeholder="Your User ID"
          className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          placeholder="Referral Code"
          className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />

        <button
          onClick={applyReferral}
          className="w-full bg-black text-white py-4 rounded-lg text-base hover:bg-gray-900 transition"
        >
          Apply referral
        </button>

        {err && <p className="text-red-600 text-base">{err}</p>}

        {result && (
          <p className="text-green-700 text-base mt-3">
            {result.message}. New coins: <b>{result.newCoins}</b>
          </p>
        )}
      </div>
    </Card>
  );
}
