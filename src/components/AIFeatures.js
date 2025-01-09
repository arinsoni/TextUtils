import React, { useState } from 'react';

// Use your Hugging Face token from environment variables (recommended)
const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;



// Add this language mapping near the top of your file, after the imports
const LANGUAGE_NAMES = {
  'af': 'Afrikaans',
  'ar': 'Arabic',
  'bg': 'Bulgarian',
  'bn': 'Bengali',
  'ca': 'Catalan',
  'cs': 'Czech',
  'cy': 'Welsh',
  'da': 'Danish',
  'de': 'German',
  'el': 'Greek',
  'en': 'English',
  'es': 'Spanish',
  'et': 'Estonian',
  'fa': 'Persian',
  'fi': 'Finnish',
  'fr': 'French',
  'gu': 'Gujarati',
  'he': 'Hebrew',
  'hi': 'Hindi',
  'hr': 'Croatian',
  'hu': 'Hungarian',
  'id': 'Indonesian',
  'it': 'Italian',
  'ja': 'Japanese',
  'kn': 'Kannada',
  'ko': 'Korean',
  'lt': 'Lithuanian',
  'lv': 'Latvian',
  'mk': 'Macedonian',
  'ml': 'Malayalam',
  'mr': 'Marathi',
  'ne': 'Nepali',
  'nl': 'Dutch',
  'no': 'Norwegian',
  'pa': 'Punjabi',
  'pl': 'Polish',
  'pt': 'Portuguese',
  'ro': 'Romanian',
  'ru': 'Russian',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'so': 'Somali',
  'sq': 'Albanian',
  'sv': 'Swedish',
  'sw': 'Swahili',
  'ta': 'Tamil',
  'te': 'Telugu',
  'th': 'Thai',
  'tl': 'Tagalog',
  'tr': 'Turkish',
  'uk': 'Ukrainian',
  'ur': 'Urdu',
  'vi': 'Vietnamese',
  'zh': 'Chinese'
};

/**
 * Helper function for Hugging Face API calls
 */
async function fetchHuggingFace(modelName, text, params = {}, options = {}) {
  if (!text?.trim()) {
    throw new Error('Please enter some text first');
  }

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${modelName}`,
    {
      method: 'POST',
      headers: {
        // Make sure HF_TOKEN is set in your .env => REACT_APP_HF_TOKEN
        // and that you do NOT commit real tokens to public repos!
        Authorization: `Bearer ${HF_TOKEN.slice(1, -1)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
        options: {
          wait_for_model: true,
          ...options,
        },
        parameters: {
          ...params,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default function AIFeatures({ text, mode, showAlert }) {
  const [emotion, setEmotion] = useState(null);
  const [language, setLanguage] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic function to handle any type of inference
  const handleInference = async (inferenceCallback) => {
    try {
      setLoading(true);
      setError(null);
      await inferenceCallback();
    } catch (err) {
      console.error('Inference error:', err);
      setError(err.message || 'Failed to run inference');
      showAlert?.(err.message || 'Failed to run inference', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Emotion Analysis:
   * e.g., model: cardiffnlp/twitter-roberta-base-emotion
   * Returns an array of objects: [{label: 'joy', score: 0.98}, ...]
   */
  const analyzeEmotion = () => {
    handleInference(async () => {
      console.log('Analyzing emotion for:', text);
      const data = await fetchHuggingFace(
        'cardiffnlp/twitter-roberta-base-emotion',
        text
      );

      // data shape: [[ { label, score }, { label, score }, ... ]]
      // We'll use the first sub-array
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Unexpected response format from the emotion model.');
      }
      const [predictions] = data;

      // find the highest scoring label
      const highest = predictions.reduce((prev, curr) =>
        curr.score > prev.score ? curr : prev
      );

      setEmotion(highest);
      showAlert?.('Emotion analysis completed', 'success');
    });
  };

  /**
   * Language Detection:
   * e.g., model: papluca/xlm-roberta-base-language-detection
   * Returns an array of objects: [{label: 'en', score: 0.99}, {label: 'fr', score: 0.01}, ...]
   */
  const detectLanguage = () => {
    handleInference(async () => {
    console.log('Detecting language for:', text);
    const data = await fetchHuggingFace(
    'papluca/xlm-roberta-base-language-detection',
    text
    );
    // console.log(data)
    

    // data shape: [{label: 'en', score: 0.99}, ...]
    if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Unexpected response format from language model.');
    }

    // pick the highest confidence label
    const raw = data[0];  // the first element of data, which should be [{label, score}, ...]
    const highest = raw.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));


    
    // 2. highest now has the top language, for example:
    // { label: 'en', score: 0.9759424328804016 }
    console.log("Highest: ", highest)
    console.log('Detected Language:', highest.label);
    console.log('Confidence:', highest.score);


    setLanguage(highest);
    showAlert?.('Language detection completed', 'success');
    });
  };

  /**
   * Summarization:
   * e.g., model: facebook/bart-large-cnn
   * Returns an array of objects: [{summary_text: '...'}]
   */
  const summarizeText = () => {
    handleInference(async () => {
      console.log('Summarizing text:', text);
      const data = await fetchHuggingFace('facebook/bart-large-cnn', text, {
        // parameters
        max_length: 130,
        min_length: 30,
      });

      // data shape: [{summary_text: '...'}]
      setSummary(data[0]?.summary_text || '');
      showAlert?.('Text summarization completed', 'success');
    });
  };

  // Style configurations
  const cardStyle = {
    backgroundColor:
      mode === 'light' ? 'white' : mode === 'dark2' ? 'lightcyan' : 'gray',
    color: mode === 'light' ? 'black' : 'white',
    border: '1px solid',
    borderColor: mode === 'light' ? 'gray' : 'white',
    borderRadius: '8px',
    padding: '15px',
    marginTop: '20px',
  };

  const buttonStyle = {
    backgroundColor:
      mode === 'light' ? 'lightgray' : mode === 'dark2' ? 'cyan' : 'darkgray',
    color: mode === 'light' ? 'black' : mode === 'dark2' ? 'black' : 'white',
    border: '1px solid',
    margin: '5px',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const resultStyle = {
    backgroundColor: mode === 'light' ? '#f8f9fa' : '#2b3035',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '15px',
    border: '1px solid',
    borderColor: mode === 'light' ? '#dee2e6' : '#495057',
  };

  return (
    <div style={cardStyle}>
      <h3>AI Analysis Tools</h3>
      <div className="d-flex flex-wrap justify-content-start gap-2">
        <button
          onClick={analyzeEmotion}
          disabled={!text || loading}
          style={buttonStyle}
        >
          {loading ? 'Analyzing...' : 'Analyze Emotion'}
        </button>
        <button
          onClick={detectLanguage}
          disabled={!text || loading}
          style={buttonStyle}
        >
          {loading ? 'Analyzing...' : 'Detect Language'}
        </button>
        <button
          onClick={summarizeText}
          disabled={!text || loading}
          style={buttonStyle}
        >
          {loading ? 'Processing...' : 'Summarize Text'}
        </button>
      </div>

      {/* Error message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Processing...</span>
        </div>
      )}

      <div className="results-container">
        <div style={resultStyle}>
          <h4>Text Statistics:</h4>
          <p>
            <strong>Number of Words:</strong> {text.trim().split(/\s+/).filter(word => word.length > 0).length}
            <br />
            <strong>Estimated Tokens:</strong> {Math.ceil(text.trim().split(/\s+/).filter(word => word.length > 0).length * 1.3)}
            <br />
            <strong>Number of Characters:</strong> {text.length}
          </p>
        </div>

        {emotion && (
          <div style={resultStyle}>
            <h4>Detected Emotion:</h4>
            <p>
              <strong>{emotion.label}</strong> <br />
              Confidence: {Math.round(emotion.score * 100)}%
            </p>
          </div>
        )}

        {language && (
          <div style={resultStyle}>
            <h4>Detected Language:</h4>
            <p>
              <strong>{LANGUAGE_NAMES[language.label] || language.label}</strong>
              <br />
              <span className="text-muted">({language.label})</span>
              <br />
              Confidence: {Math.round(language.score * 100)}%
            </p>
          </div>
        )}

        {summary && (
          <div style={resultStyle}>
            <h4>Text Summary:</h4>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
