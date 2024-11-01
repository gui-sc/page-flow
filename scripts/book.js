document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('title');
    if (bookTitle) {
        document.getElementById('book-title').textContent = bookTitle;
    }

    // Configurações do temporizador
    const totalTime = 1 * 5 * 1000; // 25 minutos em milissegundos
    const pauseTime = 1 * 5 * 1000;  // 5 minutos de pausa em milissegundos

    let elapsed = 0; // Tempo total passado
    let isPaused = false; // Controle de pausa
    let interval; // Variável do intervalo
    let display;
    const header = document.getElementById('book-header');
    display = header.style.display;
    const progressBar = document.getElementById('progress-bar');
    const bookContent = document.getElementById('book-content');
    const playPauseBtn = document.getElementById('play-pause-btn');

    // Função para iniciar o temporizador
    function startTimer() {
        interval = setInterval(() => {
            if (!isPaused) {
                elapsed += 1000; // Incrementa o tempo passado em 1 segundo

                // Calcula o progresso e atualiza a largura da barra
                const progress = Math.min((elapsed / totalTime) * 100, 100);
                progressBar.style.width = `${progress}%`;

                if (elapsed >= totalTime) {
                    clearInterval(interval);
                    progressBar.style.width = `${0}%`;
                    lockContent();
                }
            }
        }, 1000);
    }

    // Função para pausar o temporizador
    function pauseTimer() {
        isPaused = true;
        playPauseBtn.textContent = '▶️'; // Ícone de play
    }

    // Função para retomar o temporizador
    function resumeTimer() {
        isPaused = false;
        playPauseBtn.textContent = '⏸️'; // Ícone de pause
    }

    // Alternar entre play e pause ao clicar no botão
    playPauseBtn.addEventListener('click', () => {
        if (isPaused) {
            resumeTimer();
        } else {
            pauseTimer();
        }
    });

    // Inicie o temporizador ao carregar a página
    startTimer();

    function lockContent() {
        // Bloqueia a visualização do conteúdo
        header.style.display = 'none';
        bookContent.innerHTML = `
            <div class="blocked">
                <h2>Pausa</h2>
                <p>Hora de fazer uma pausa! Aguarde alguns minutos.</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="pause-progress-bar"></div>
                </div>
            </div>
        `;
        
        // Reseta o tempo passado durante a pausa
        elapsed = 0;
        // Reinicia a barra de progresso da pausa
        let pauseElapsed = 0;
        const pauseProgressBar = document.getElementById('pause-progress-bar');

        // Função para iniciar a barra de progresso da pausa
        const pauseInterval = setInterval(() => {
            pauseElapsed += 1000; // Incrementa o tempo passado em 1 segundo

            // Calcula o progresso e atualiza a largura da barra de pausa
            const pauseProgress = Math.min((pauseElapsed / pauseTime) * 100, 100);
            pauseProgressBar.style.width = `${pauseProgress}%`;

            if (pauseElapsed >= pauseTime) {
                clearInterval(pauseInterval);
                unlockContent();
            }
        }, 1000);
    }

    function unlockContent() {
        // Desbloqueia o conteúdo original
        elapsed = 0;
        header.style.display = display;
        bookContent.innerHTML = `
            <section id="book-content-section">
                <h2>Capítulo 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
                <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                <h2>Capítulo 2</h2>
                <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
                <p>Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
                <h2>Capítulo 3</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
                <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                <h2>Capítulo 4</h2>
                <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
                <p>Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
                <h2>Capítulo 5</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
                <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            </section>
        `;
        startTimer();
    }
});
