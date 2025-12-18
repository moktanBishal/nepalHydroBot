import streamlit as st
import os

st.set_page_config(page_title="नेपाल जलविद्युत टाइमलाइन AI", page_icon="⚡", layout="centered")
st.markdown("""
    <h1 style='text-align: center; color: #0066cc;'>⚡ नेपाल जलविद्युत परियोजना टाइमलाइन AI ⚡</h1>
    <p style='text-align: center; font-size:18px;'>१९११ फर्पिङ देखि २०२५ सम्म – Upper Tamakoshi, Arun-3, West Seti सबैको अपडेट</p>
    <p style='text-align: center;'>🎤 माइक थिचेर बोल्नुहोस् वा टाइप गर्नुहोस् (Nepali/English OK)</p>
    <hr>
""", unsafe_allow_html=True)

knowledge = """
नेपाल जलविद्युत अपडेट (डिसेम्बर २०२५):
- १९११: फर्पिङ (५०० kW) – नेपालको पहिलो
- २०२१: Upper Tamakoshi (४५६ MW) पूरा
- हाल: कुल ~३,४२२ MW (३,२५६ MW hydro)
मुख्य परियोजना:
- Arun-3 (९०० MW): SJVN India, चाँडै पूरा
- Lower Arun (६६९ MW): लाइसेन्स जारी
- West Seti (७५० MW): NHPC India, सर्वे लाइसेन्स थपियो
- Budhi Gandaki (१,२०० MW): storage, योजना अगाडि
- Rahughat (४० MW): अन्तिम चरण (नोभेम्बर २०२५ डेडलाइन)
भविष्य: १०,८००+ MW निर्माणाधीन, भारत/बंगलादेश निर्यात"""

if "messages" not in st.session_state:
    st.session_state.messages = [{"role": "assistant", "content": "नमस्ते! म नेपाल जलविद्युत टाइमलाइन AI हुँ। Pharping देखि Arun-3 सम्म केही पनि सोध्नुहोस्। 🎤"}]

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

# Voice + Text Input
audio = st.audio_input("🎤 बोल्न थिच्नुहोस्")
text_prompt = st.chat_input("वा यहाँ लेख्नुहोस्...")

prompt = text_prompt or ("Voice input detected – जलविद्युत बारे सोध्नुहोस्" if audio else None)

if prompt:
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)

    with st.chat_message("assistant"):
        with st.spinner("सोच्दैछु..."):
            response = f"{knowledge}\n\nतपाईंको प्रश्न: {prompt}\nथप जानकारी चाहियो भने सोध्नुहोस्!"
        st.write(response)
        st.session_state.messages.append({"role": "assistant", "content": response})
