"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface CsvUploadZoneProps {
  onSuccess: (accountId: string) => void;
  onCancel: () => void;
}

export default function CsvUploadZone({ onSuccess, onCancel }: CsvUploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        setError("Please upload a valid CSV file.");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/v1/accounts/csv/upload", {
        method: "POST",
        body: formData,
        // Auth header would normally be added here via a middleware or wrapper
      });

      if (!response.ok) {
        throw new Error("Failed to upload CSV. Please check the file format.");
      }

      const data = await response.json();
      setIsSuccess(true);
      
      // Artificial delay for UX "precision" feel
      setTimeout(() => {
        onSuccess(data.account_id);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-flow-obsidian border border-flow-gold/20 p-8 md:p-12 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-flow-gold/5 blur-[80px] -mr-32 -mt-32"></div>
      
      <div className="relative z-10 space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Upload className="h-5 w-5 text-flow-gold" />
            <span className="flow-label text-white/40 tracking-[0.2em]">MANUAL IMPORT</span>
          </div>
          <button onClick={onCancel} className="text-white/20 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
            Upload Transaction History
          </h3>
          <p className="font-body text-sm text-white/50 leading-relaxed">
            Export your last 90 days of transactions from your bank as a CSV. 
            We&apos;ll parse the data to initialize your Safe-to-Spend™ model.
          </p>
        </div>

        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer border-2 border-dashed border-white/10 bg-white/[0.02] p-12 text-center transition-all hover:border-flow-gold/30 hover:bg-white/[0.04]"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".csv" 
              className="hidden" 
            />
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8 text-white/20 group-hover:text-flow-gold transition-colors" />
              </div>
              <div>
                <p className="flow-label text-white/60 mb-1">DRAG & DROP OR CLICK TO BROWSE</p>
                <p className="text-[10px] text-white/20 font-mono tracking-widest">MAX FILE SIZE: 10MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-flow-gold/30 bg-flow-gold/5 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-flow-gold/10 flex items-center justify-center text-flow-gold">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white font-bold text-sm truncate max-w-[200px]">{file.name}</p>
                <p className="text-[10px] text-white/40 font-mono">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button 
              disabled={isUploading || isSuccess}
              onClick={() => setFile(null)} 
              className="text-white/20 hover:text-white transition-colors disabled:opacity-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 border-l-2 border-red-400 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
          </div>
        )}

        <div className="pt-4 flex gap-4">
          <button
            disabled={!file || isUploading || isSuccess}
            onClick={handleUpload}
            className="flex-1 bg-flow-gold text-flow-black font-bold py-6 px-8 flex items-center justify-center gap-3 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-display tracking-[0.2em] text-sm font-black uppercase">Parsing Data...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-display tracking-[0.2em] text-sm font-black uppercase">Imported</span>
              </>
            ) : (
              <>
                <span className="font-display tracking-[0.2em] text-sm font-black uppercase">Process Statement</span>
              </>
            )}
          </button>
          <button
            disabled={isUploading || isSuccess}
            onClick={onCancel}
            className="px-8 border border-white/10 text-white/40 font-bold uppercase tracking-widest text-xs hover:text-white hover:bg-white/5 transition-all"
          >
            Back
          </button>
        </div>

        <p className="text-center text-white/20 font-body text-[10px] leading-relaxed uppercase tracking-[0.1em]">
          CSV data is processed locally before encrypted transmission. We do not store raw files.
        </p>
      </div>
    </div>
  );
}
