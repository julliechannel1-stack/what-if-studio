#!/usr/bin/env python3
"""Whisper tiny.en transcription + word timings (placeholder / skeleton).

Usage: python3 whisper_words_tiny.py <voice.wav> [script.txt]
Writes words.json next to the wav when whisper is installed.
The small model OOMs on low-RAM machines, so tiny.en is mandatory.
If whisper is not installed, this prints install instructions and exits 2.
Real dropped/added/substituted words ARE errors; Whisper artifacts
(split compounds, contractions, digit normalisation, homophones) are not.
"""
import json, sys, pathlib

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    wav = pathlib.Path(sys.argv[1])
    if not wav.exists():
        print(f"missing wav: {wav}", file=sys.stderr)
        return 1
    try:
        import whisper  # type: ignore
    except ImportError:
        print("whisper not installed: pip install openai-whisper (then use model tiny.en)", file=sys.stderr)
        return 2
    model = whisper.load_model("tiny.en")
    result = model.transcribe(str(wav), word_timestamps=True)
    words = []
    for seg in result.get("segments", []):
        for w in seg.get("words", []):
            words.append({"w": w["word"].strip(), "s": round(w["start"], 3), "e": round(w["end"], 3), "p": False})
    out = wav.parent / "words.json"
    out.write_text(json.dumps(words, indent=2))
    print(f"wrote {out} ({len(words)} words)")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
