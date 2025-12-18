import streamlit as st
import os

st.set_page_config(page_title="नेपाल जलविद्युत टाइमलाइन AI", page_icon="⚡", layout="centered")
st.markdown("""
    <h1 style='text-align: center; color: #0066cc;'>⚡ नेपाल जलविद्युत परियोजना टाइमलाइन AI ⚡</h1>
    <p style='text-align: center; font-size:18px;'>Pharping 1911 देखि 2025 सम्म – Upper Tamakoshi, Arun-3, Budhi Gandaki सबैको जानकारी</p>
    <p style='text-align: center;'>🎤 माइक आइकन थिचेर बोल्नुहोस् वा टाइप गर्नुहोस् (Nepali/English)</p>
    <hr>
""", unsafe_allow_html=True)

# Knowledge base (Grok-style answers baked in + voice-friendly)
knowledge = """
नेपालको जलविद्युत इतिहास:
- १९११: फर्पिङ (५०० kW) – नेपालको पहिलो
- १९९० सम्म: ~२५० MW
- २०२१: Upper Tamakoshi (४५६ MW) पूरा – नेपालको सबैभन्दा ठूलो
- २०२५: कुल ~३,४२२ MW (३,२५६ MW hydro)
मुख्य परियोजना:
- Upper Tamakoshi: २०२१ मा पूरा, भूकम्प/बाढीले ढिलो
- Arun-3 (९०० MW): भारतको SJVN ले बनाउँदै, चाँडै पूरा
- Budhi Gandaki (१,२०० MW): storage type, निर्माण चाँडै सुरु
- West Seti (७५० MW): storage, भारत/नेपाल सहकार्य
भविष्य: १०,८०० MW लाइसेन्स, भारतलाई निर्यात"""

if "messages" not in st.session_state:
    st.session_state.messages = [{"role": "assistant", "content": "नमस्ते! म नेपाल जलविद्युत टाइमलाइनको AI साथी। Upper Tamakoshi को इतिहास होस् वा Arun-3 को अपडेट, बोल्नुहोस् वा लेख्नुहोस्। 🎤"}]

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

# Voice + Text Input
audio = st.audio_input("🎤 बोल्न थिच्नुहोस् (Nepali/English OK)")
text_prompt = st.chat_input("वा यहाँ लेख्नुहोस्...")

prompt = None
if audio:
    # In real Grok voice, this would transcribe – here we simulate helpful response
    prompt = "Voice input detected – जलविद्युत बारे सोध्नुहोस्"
if text_prompt:
    prompt = text_prompt

if prompt:
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)

    with st.chat_message("assistant"):
        with st.spinner("सोच्दैछु..."):
            # Grok-style response (free Grok 3 voice mode inspires natural Nepali replies)
            response = f"{knowledge}\n\nतपाईंको प्रश्न: {prompt}\nजवाफ: नेपालको जलविद्युत क्षमता २०२५ मा ~३,४०० MW पुग्यो। Upper Tamakoshi ले load-shedding अन्त्य गर्‍यो। Arun-3 चाँडै पूरा हुँदैछ। थप details चाहियो?"
        st.write(response)
        st.session_state.messages.append({"role": "assistant", "content": response})
