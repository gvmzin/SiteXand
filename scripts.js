document.addEventListener('DOMContentLoaded', () => {

    // --- Estrutura de Dados dos Beats ---
    // VERIFIQUE SE OS CAMINHOS EM "file" E "art" ESTÃO EXATAMENTE CORRETOS!
    const beatsData = {
        "Trap": [
            { title: "CINEMATIC", file: "audios/trap/CINEMATIC132BPMG.wav", art: "img/trap.jpeg", bpm: "132", key: "G#" },
            { title: "DIGITAL", file: "audios/trap/DIGITAL132BPMGm.wav", art: "img/trap.jpeg", bpm: "155", key: "Gm" },
            { title: "LASERS", file: "audios/trap/LASERS118BPMG.wav", art: "img/trap.jpeg", bpm: "118", key: "G#" },
            { title: "MYTHICAL", file: "audios/trap/MYTHICAL126BPMF.wav", art: "img/trap.jpeg", bpm: "126", key: "F#" },
            { title: "ROCKSEASON", file: "audios/trap/ROCKSEASON90BPMEm.wav", art: "img/trap.jpeg", bpm: "90", key: "Em" },
            { title: "RUBY", file: "audios/trap/RUBYG120BPM.wav", art: "img/trap.jpeg", bpm: "120", key: "G#" },
            { title: "WILLING", file: "audios/trap/RUBYG120BPM.wav", art: "img/trap.jpeg", bpm: "145", key: "F#" }
        ],
        "Pluggnb": [
            { title: "HAPPY DAY", file: "audios/plugbbn/HAPPYDAY134BPMC.wav", art: "img/plug.jpeg", bpm: "134", key: "C" },
            { title: "WINDS", file: "audios/plugbbn/WINDS135BPMF.wav", art: "img/plug.jpeg", bpm: "135", key: "F#" }
        ],
        "R&B": [
            { title: "STARS NIGHT", file: "audios/randb/STARSNIGHT83BPMDm.wav", art: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop", bpm: "83", key: "Dm" }
        ],
        "HardTrap AleeType": [],
        "Jerk & Glo": [],
        "Gunna Type": [
            { title: "ANCOR", file: "audios/plugbbn/WINDS135BPMF.wav", art: "img/gunna.jpg", bpm: "128", key: "Am" },
            { title: "DINAMITE", file: "audios/gunnatype/DINAMITEA135BPM.wav", art: "img/gunna.jpg", bpm: "135", key: "A#" },
            { title: "NEW YEAR", file: "audios/gunnatype/DINAMITEA135BPM.wav", art: "img/gunna.jpg", bpm: "160", key: "A#m" },
            { title: "STALKER", file: "audios/gunnatype/DINAMITEA135BPM.wav", art: "img/gunna.jpg", bpm: "165", key: "Em" }
        ],
        "Veigh Type": [
            { title: "ARTIFICIAL", file: "audios/veightype/ARTIFICIAL123BPMGm.wav", art: "img/veigh.webp", bpm: "123", key: "Gm" },
            { title: "PREDIN", file: "audios/veightype/PREDIN126BPMA.wav", art: "img/veigh.webp", bpm: "126", key: "A" },
            { title: "PREDIN(NO GUITAR)", file: "audios/veightype/PREDIN(NOGUITAR)126BPMA.wav", art: "img/veigh.webp", bpm: "126", key: "A" },
            { title: "WATASHINOKOTO", file: "audios/veightype/WATASHINOKOTO130BPMBm.wav", art: "img/veigh.webp", bpm: "130", key: "Bm" }
        ],
        "DarkPlugg": [
            { title: "WEST GANG", file: "audios/darkplug/3-WESTGANG148BPMEm.wav", art: "img/darkplug.jpeg", bpm: "148", key: "Em" },
            { title: "RED DOT", file: "audios/darkplug/4-RED DOT151BPMDm.wav", art: "img/darkplug.jpeg", bpm: "151", key: "D#m" },
            { title: "MIDNIGHT", file: "audios/darkplug/MIDNIGHT128BPMDm.wav", art: "img/darkplug.jpeg", bpm: "128", key: "D#m" },
            { title: "OPPS", file: "audios/darkplug/OPPS155BPMDm.wav", art: "img/darkplug.jpeg", bpm: "155", key: "Dm" },
            { title: "SHOTGUN", file: "audios/darkplug/SHOTGUN145BPMAm.wav", art: "img/darkplug.jpeg", bpm: "145", key: "Am" }
        ],
        "NewJazz": []
    };

    // --- Elementos do DOM ---
    const modal = document.getElementById('modalBeats');
    const modalGrid = document.getElementById('modal-grid');
    const modalTitle = document.getElementById('modal-title') || createModalTitle();
    const closeModalButton = document.getElementById('close-modal-button');
    const styleCards = document.querySelectorAll('.style-card');
    
    // Player
    const playerContainer = document.getElementById('player-container');
    const playerPlayPause = document.getElementById('player-play-pause');
    const playerArt = document.getElementById('player-art');
    const playerTitle = document.getElementById('player-title');
    const playerCurrentTime = document.getElementById('player-current-time');
    const playerDuration = document.getElementById('player-duration');
    const playerProgress = document.getElementById('player-progress');
    const volumeControl = document.getElementById('player-volume');
    
    const audio = new Audio();
    let currentPlayingButton = null;

    // --- Ajuste de Volume ---
    audio.volume = 0.5;
    volumeControl.value = audio.volume;
    
    // --- NOVO: Diagnóstico de Erros ---
    // Esta função será chamada se o navegador não conseguir carregar o áudio.
    audio.onerror = function() {
        console.error(`Erro: Não foi possível encontrar ou carregar o ficheiro de áudio: ${audio.src}`);
        alert(`Erro ao carregar o beat.`);
        // Reseta o player para um estado limpo
        if(currentPlayingButton) currentPlayingButton.innerHTML = getPlayIcon();
        playerPlayPause.innerHTML = getPlayIcon();
        currentPlayingButton = null;
    };


    function createModalTitle() {
        const titleEl = document.createElement('h2');
        titleEl.id = 'modal-title';
        titleEl.className = 'text-3xl font-bold text-white text-center mb-8';
        modal.querySelector('.relative').prepend(titleEl);
        return titleEl;
    }

    // --- Lógica dos Estilos e Modal ---
    styleCards.forEach(card => {
        card.addEventListener('click', () => {
            const style = card.dataset.style;
            const beatsForStyle = beatsData[style] || [];
            
            // Corrigido para buscar o título do modal no HTML ou criar um novo
            const titleElement = modal.querySelector('#modal-title') || createModalTitle();
            titleElement.textContent = `Beats de ${style}`;
            
            populateModalGrid(beatsForStyle);
            modal.classList.remove('hidden');
        });
    });

    closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    function populateModalGrid(beats) {
        modalGrid.innerHTML = '';
        if (beats.length === 0) {
            modalGrid.innerHTML = '<p class="col-span-full text-center text-gray-400">Nenhum beat encontrado para este estilo ainda.</p>';
            return;
        }

        beats.forEach(beat => {
            const beatCard = createBeatCard(beat);
            modalGrid.appendChild(beatCard);
        });
    }

    // --- Lógica do Player ---
    function createBeatCard(beat) {
        const card = document.createElement('div');
        card.className = 'beat-card group glass-effect rounded-xl overflow-hidden';
        card.innerHTML = `
            <div class="flex items-center gap-4 p-4 rounded-lg hover:bg-white/10 transition-colors duration-300">

    <div>
        <button class="play-button text-white bg-blue-600/70 rounded-full p-3" data-file="${beat.file}" data-title="${beat.title}" data-art="${beat.art}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3l14 9-14 9V3z" />
            </svg>
        </button>
    </div>

    <div class="flex-grow">
        <h3 class="text-lg font-bold text-white truncate">${beat.title}</h3>
        <div class="flex items-center gap-4 mt-1 text-sm text-gray-400">
            <span>${beat.bpm} BPM</span>
            <span>${beat.key}</span>
        </div>
    </div>

</div>
        `;

        const playButton = card.querySelector('.play-button');
        playButton.innerHTML = getPlayIcon();
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            handlePlayButtonClick(playButton, beat);
        });
        return card;
    }

    function handlePlayButtonClick(button, beat) {
        const isPlaying = audio.src.includes(encodeURI(beat.file)) && !audio.paused;

        if (isPlaying) {
            audio.pause();
        } else {
            if (currentPlayingButton && currentPlayingButton !== button) {
                currentPlayingButton.innerHTML = getPlayIcon();
            }
            audio.src = beat.file;
            audio.play().catch(e => console.error("Erro ao tentar tocar o áudio:", e)); // Adicionado .catch para mais detalhes do erro
            playerContainer.classList.remove('translate-y-full');
            updatePlayerInfo(beat);
            currentPlayingButton = button;
        }
    }

    // --- Atualizações da UI do Player ---
    audio.addEventListener('play', () => {
        if (currentPlayingButton) currentPlayingButton.innerHTML = getPauseIcon();
        playerPlayPause.innerHTML = getPauseIcon();
    });

    audio.addEventListener('pause', () => {
        if (currentPlayingButton) currentPlayingButton.innerHTML = getPlayIcon();
        playerPlayPause.innerHTML = getPlayIcon();
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            playerProgress.value = (audio.currentTime / audio.duration) * 100;
            playerCurrentTime.textContent = formatTime(audio.currentTime);
            playerDuration.textContent = formatTime(audio.duration);
        }
    });
    
    playerPlayPause.addEventListener('click', () => {
        if(audio.src) {
            audio.paused ? audio.play() : audio.pause();
        }
    });
    playerProgress.addEventListener('input', (e) => {
       if(audio.src && audio.duration) audio.currentTime = (e.target.value / 100) * audio.duration;
    });
    volumeControl.addEventListener('input', (e) => audio.volume = e.target.value);

    function updatePlayerInfo(beat) {
        playerTitle.textContent = beat.title;
        playerArt.src = beat.art;
    }

    // --- Funções Utilitárias ---
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

    const getPlayIcon = () => `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 15.132A1.25 1.25 0 005.25 16.25h9.5A1.25 1.25 0 0016 14.868V5.132A1.25 1.25 0 0014.75 3.75h-9.5A1.25 1.25 0 004.018 4.868v10.264zM5.25 5l9.5 4.75-9.5 4.75V5z"></path></svg>`;
    const getPauseIcon = () => `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M5.75 3.75a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75h-1.5zm6.5 0a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75h-1.5z"></path></svg>`;

    // Inicializa o botão de play/pause do player principal
    playerPlayPause.innerHTML = getPlayIcon();
});