import React, { useEffect, useState } from "react";
import {
    addressToEvm,
    evmToAddress,
    cryptoWaitReady,
    decodeAddress,
} from "@polkadot/util-crypto";
import { u8aToHex, isHex } from "@polkadot/util";

export default function App() {
    const [polkaInput, setPolkaInput] = useState("");
    const [ethInput, setEthInput] = useState("");
    const [ethOutput, setEthOutput] = useState("");
    const [polkaOutput, setPolkaOutput] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [error, setError] = useState("");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await cryptoWaitReady();
                setReady(true);
            } catch (e) {
                console.error(e);
                setError("Failed to initialize Polkadot crypto libraries");
            }
        })();
    }, []);

    const handlePolkaToEth = () => {
        try {
            setError("");
            if (!ready) return setError("Crypto not ready yet, try again.");
            if (!polkaInput.trim()) return setError("Enter a Polkadot/Substrate address");

            const evmBytes = addressToEvm(polkaInput.trim());
            const evmHex = u8aToHex(evmBytes);
            setEthOutput(evmHex);

            const pubKey = decodeAddress(polkaInput.trim());
            setPublicKey(u8aToHex(pubKey));
        } catch (err) {
            console.error(err);
            setError("Invalid Polkadot/Substrate address");
            setEthOutput("");
            setPublicKey("");
        }
    };

    const handleEthToPolka = () => {
        try {
            setError("");
            if (!ready) return setError("Crypto not ready yet, try again.");
            if (!ethInput.trim()) return setError("Enter an Ethereum 0x address");

            const clean = ethInput.trim().toLowerCase();
            if (!isHex(clean) || clean.length !== 42)
                return setError("Invalid Ethereum (0x) address");

            const ss58Addr = evmToAddress(clean, 42);
            setPolkaOutput(ss58Addr);

            const pubKey = decodeAddress(ss58Addr);
            setPublicKey(u8aToHex(pubKey));
        } catch (err) {
            console.error(err);
            setError("Invalid Ethereum address");
            setPolkaOutput("");
            setPublicKey("");
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#e0e7ff] to-[#f5f3ff] p-6 text-gray-800 font-inter">
            {/* Logo / Branding */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
                <img
                    src="/images/logo.png"
                    alt="Tech Angel X Logo"
                    className="w-14 h-14 rounded-full shadow-md border border-white/70 backdrop-blur"
                />
                <div>
                    <p className="font-bold text-gray-800 text-lg tracking-tight">
                        Tech Angel X
                    </p>
                    <p className="text-gray-500 text-xs -mt-1">by Ricki Angel</p>
                </div>
            </div>

            {/* Header */}
            <h1 className="text-5xl font-extrabold text-center mb-3 mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                Polkadot ↔ Ethereum
            </h1>
            <p className="text-gray-600 text-center mb-10 font-medium">
                Convert SS58 and 0x addresses — and view the public key
            </p>

            {/* Converter Boxes */}
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
                {/* Polkadot → EVM */}
                <div className="backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-5 text-center">
                        Polkadot → EVM (0x)
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter Polkadot address"
                        value={polkaInput}
                        onChange={(e) => setPolkaInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-mono text-sm bg-white/80 backdrop-blur-sm"
                    />

                    <button
                        onClick={handlePolkaToEth}
                        disabled={!ready}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Convert to 0x
                    </button>

                    {ethOutput && (
                        <div className="mt-4 bg-gray-50/70 border border-gray-200 rounded-lg p-3 break-words text-sm font-mono text-gray-700">
                            <span className="font-semibold text-gray-800">EVM (H160) Address:</span>
                            <p>{ethOutput}</p>
                        </div>
                    )}
                </div>

                {/* EVM → Polkadot */}
                <div className="backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-purple-700 mb-5 text-center">
                        EVM (0x) → Polkadot
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter Ethereum address"
                        value={ethInput}
                        onChange={(e) => setEthInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono text-sm bg-white/80 backdrop-blur-sm"
                    />

                    <button
                        onClick={handleEthToPolka}
                        disabled={!ready}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Convert to Polkadot
                    </button>

                    {polkaOutput && (
                        <div className="mt-4 bg-gray-50/70 border border-gray-200 rounded-lg p-3 break-words text-sm font-mono text-gray-700">
                            <span className="font-semibold text-gray-800">Polkadot Address:</span>
                            <p>{polkaOutput}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Public Key Display */}
            {publicKey && (
                <div className="mt-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200 p-6 max-w-3xl w-full text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Derived Public Key
                    </h3>
                    <p className="font-mono text-sm text-gray-700 break-words">{publicKey}</p>
                </div>
            )}

            {/* Error Box */}
            {error && (
                <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-lg text-center shadow-sm">
                    {error}
                </div>
            )}

            <footer className="mt-12 text-gray-400 text-xs text-center">
                © 2025 Ricki Angel | Tech Angel X
            </footer>
        </div>
    );
}
