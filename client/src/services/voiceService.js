// FitVerse AI - Voice-Controlled Workout Service (Web Speech API)

class VoiceService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    } else {
      this.recognition = null;
    }
    this.synthesis = window.speechSynthesis;
  }

  isSupported() {
    return !!this.recognition;
  }

  speak(text) {
    if (!this.synthesis) return;
    this.synthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    this.synthesis.speak(utterance);
  }

  startListening(onCommandReceived) {
    if (!this.recognition) return false;

    this.recognition.onresult = (event) => {
      const lastIndex = event.results.length - 1;
      const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();
      console.log('Voice Command:', transcript);
      onCommandReceived(transcript);
    };

    this.recognition.onerror = (err) => {
      console.warn('Speech recognition error:', err);
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      return false;
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }
}

export default new VoiceService();
