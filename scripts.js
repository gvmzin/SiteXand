document.addEventListener('DOMContentLoaded', () => {

    // --- BASE DE DADOS DOS BEATS ---
    // Para adicionar um novo beat, basta adicionar um objeto a esta lista.
    const beatsData = [
        {
            id: 'beat-1',
            title: 'West Gang',
            bpm: 148,
            key: 'C# Min',
            tags: [{ name: 'Trap', color: 'blue' }, { name: 'Chill', color: 'purple' }],
            audioSrc: 'audios/3- WEST GANG 148 BPM Em.wav',
            imgSrc: 'https://placehold.co/400x400/0a0a0a/3b82f6?text=West+Gang',
            display: 'main'
        },
        {
            id: 'beat-2',
            title: 'Rua das Sombras',
            bpm: 145,
            key: 'G Min',
            tags: [{ name: 'Drill', color: 'red' }, { name: 'Dark', color: 'gray' }],
            audioSrc: 'path/to/your/audio2.mp3', // Troque o caminho
            imgSrc: 'https://placehold.co/400x400/0a0a0a/8b5cf6?text=Rua+das+Sombras',
            display: 'main'
        },
        {
            id: 'beat-3',
            title: 'Luzes de Neon',
            bpm: 120,
            key: 'F Maj',
            tags: [{ name: 'R&B', color: 'pink' }, { name: 'Smooth', color: 'yellow' }],
            audioSrc: 'path/to/your/audio3.mp3', // Troque o caminho
            imgSrc: 'https://placehold.co/400x400/0a0a0a/ec4899?text=Luzes+de+Neon',
            display: 'main'
        },
        {
            id: 'beat-4',
            title: 'Concreto',
            bpm: 95,
            key: 'D Min',
            tags: [{ name: 'Boom Bap', color: 'green' }, { name: 'Hard', color: 'orange' }],
            audioSrc: 'path/to/your/audio4.mp3', // Troque o caminho
            imgSrc: 'https://placehold.co/400x400/0a0a0a/10b981?text=Concreto',
            display: 'main'
        },
        {
            id: 'beat-5',
            title: 'Sunset Flow',
            bpm: 100,
            key: 'A Maj',
            tags: [{ name: 'Lo-Fi', color: 'yellow' }],
            audioSrc: 'path/to/your/audio5.mp3', // Troque o caminho
            imgSrc: 'https://placehold.co/400x400/0a0a0a/f59e0b?text=Sunset+Flow',
            display: 'modal'
        },
        {
            id: 'beat-6',
            title: 'Digital Sky',
            bpm: 130,
            key: 'G# Min',
            tags: [{ name: 'Hyperpop', color: 'cyan' }],
            audioSrc: 'path/to/your/audio6.mp3', // Troque o caminho
            imgSrc: 'https://placehold.co/400x400/0a0a0a/22d3ee?text=Digital+Sky',
            display: 'modal'
        }
    ];

    // --- ELEMENTOS DO DOM ---
    const beatsGrid = document.getElementById('beats-grid');
    const modalGrid = document.getElementById('modal-grid');
    const playerContainer = document.getElementById('player-container');
    const playerPlayPause = document.getElementById('player-play-pause');
    const playerArt = document.getElementById('player-art');
    const playerTitle = document.getElementById('player-title');
    const playerCurrentTime = document.getElementById('player-current-time');
    const playerDuration = document.getElementById('player-duration');
    const playerProgress = document.getElementById('player-progress');
    const playerVolume = document.getElementById('player-volume');

    const modal = document.getElementById('modalBeats');
    const openModalButton = document.getElementById('open-modal-button');
    const closeModalButton = document.getElementById('close-modal-button');

    // --- PLAYER DE ÁUDIO ---
    const audio = new Audio();
    let currentPlayingBeat = null;

    const playIcon = `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 5.035A1.5 1.5 0 004 6.5v7a1.5 1.5 0 002.3 1.465l5.5-3.5a1.5 1.5 0 000-2.93L6.3 5.035z"></path></svg>`;
    const pauseIcon = `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 5.5A.5.5 0 016 6v8a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm9 0a.5.5 0 01.5.5v8a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z"></path></svg>`;
    playerPlayPause.innerHTML = playIcon;


    // --- FUNÇÕES ---

    // Mapeamento de cores para as tags
    const tagColors = {
        blue: 'bg-blue-500/20 text-blue-300',
        purple: 'bg-purple-500/20 text-purple-300',
        red: 'bg-red-500/20 text-red-300',
        gray: 'bg-gray-500/20 text-gray-300',
        pink: 'bg-pink-500/20 text-pink-300',
        yellow: 'bg-yellow-500/20 text-yellow-300',
        green: 'bg-green-500/20 text-green-300',
        orange: 'bg-orange-500/20 text-orange-300',
        cyan: 'bg-cyan-500/20 text-cyan-300',
    };

    // Cria o HTML para um único card de beat
    function createBeatCardHTML(beat) {
        const tagsHTML = beat.tags.map(tag =>
            `<span class="text-xs font-semibold ${tagColors[tag.color] || tagColors.gray} py-1 px-2 rounded-full">${tag.name}</span>`
        ).join('');

        return `
            <div class="beat-card glass-effect rounded-xl overflow-hidden group" data-beat-id="${beat.id}">
                <div class="relative">
                    <img src="${beat.imgSrc}" alt="Arte do beat ${beat.title}" class="w-full h-auto object-cover beat-art">
                    <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 play-overlay">
                        <button class="play-button text-white bg-blue-600/70 rounded-full p-4 accent-glow transform transition-transform hover:scale-110">
                            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 5.035A1.5 1.5 0 004 6.5v7a1.5 1.5 0 002.3 1.465l5.5-3.5a1.5 1.5 0 000-2.93L6.3 5.035z"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="text-xl font-bold text-white truncate">${beat.title}</h3>
                    <div class="flex flex-wrap gap-2 mt-2">${tagsHTML}</div>
                    <div class="flex justify-between items-center mt-4 text-sm text-gray-400">
                        <span>${beat.bpm} BPM</span>
                        <span>${beat.key}</span>
                    </div>
                    <button class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
    }

    // Preenche as grids com os cards
    function renderBeats() {
        beatsGrid.innerHTML = beatsData
            .filter(beat => beat.display === 'main')
            .map(createBeatCardHTML)
            .join('');
        
        modalGrid.innerHTML = beatsData
            .filter(beat => beat.display === 'modal')
            .map(createBeatCardHTML)
            .join('');
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function playBeat(beatId) {
        const beat = beatsData.find(b => b.id === beatId);
        if (!beat) return;

        if (currentPlayingBeat?.id === beat.id && !audio.paused) {
            audio.pause();
        } else {
            currentPlayingBeat = beat;
            audio.src = beat.audioSrc;
            audio.play();
            playerContainer.style.transform = 'translateY(0)';
            playerArt.src = beat.imgSrc;
            playerTitle.textContent = beat.title;
        }
    }
    
    // --- EVENT LISTENERS ---

    // Tocar beat (usando delegação de eventos para performance)
    document.body.addEventListener('click', (e) => {
        const playButton = e.target.closest('.play-button');
        if (playButton) {
            const card = playButton.closest('.beat-card');
            const beatId = card.dataset.beatId;
            playBeat(beatId);
        }
    });

    // Controles do player de áudio
    playerPlayPause.addEventListener('click', () => {
        if (!currentPlayingBeat) return;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
    
    audio.addEventListener('play', () => playerPlayPause.innerHTML = pauseIcon);
    audio.addEventListener('pause', () => playerPlayPause.innerHTML = playIcon);
    audio.addEventListener('ended', () => playerPlayPause.innerHTML = playIcon);

    audio.addEventListener('timeupdate', () => {
        if (isNaN(audio.duration)) return;
        playerProgress.value = (audio.currentTime / audio.duration) * 100;
        playerCurrentTime.textContent = formatTime(audio.currentTime);
        playerDuration.textContent = formatTime(audio.duration);
    });

    playerProgress.addEventListener('input', () => {
        if (isNaN(audio.duration)) return;
        audio.currentTime = (playerProgress.value / 100) * audio.duration;
    });

    playerVolume.addEventListener('input', () => audio.volume = playerVolume.value);

    // Menu Mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    
    // Modal
    openModalButton.addEventListener('click', () => modal.classList.remove('hidden'));
    closeModalButton.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // --- INICIALIZAÇÃO ---
    renderBeats();
});