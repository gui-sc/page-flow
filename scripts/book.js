document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('title');
    const paragraph = urlParams.get('paragraph');

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
    const backButton = document.getElementById('back-btn');
    const scrollDownButton = document.getElementById('scroll-down-btn');
    let bookContentSection = document.getElementById('book-content-section').querySelectorAll('p');
    let actualParagraph = paragraph ? Number(paragraph) : 0;
    bookContentSection[actualParagraph].classList.add('highlight');
    bookContentSection[actualParagraph].scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    // Inicie o temporizador ao carregar a página
    startTimer();

    function lockContent() {
        // Bloqueia a visualização do conteúdo
        
        header.style.display = 'none';
        bookContent.innerHTML = `
            <div class="blocked">
                <h2>Hora de fazer uma pausa!</h2>
                <p>Te vejo em 5 minutos.</p>
            </div>
        `;

        // Reseta o tempo passado durante a pausa
        elapsed = 0;
        // Reinicia a barra de progresso da pausa
        let pauseElapsed = 0;

        // Função para iniciar a barra de progresso da pausa
        const pauseInterval = setInterval(() => {
            pauseElapsed += 1000; // Incrementa o tempo passado em 1 segundo

            // Calcula o progresso e atualiza a largura da barra de pausa
            const pauseProgress = Math.min((pauseElapsed / pauseTime) * 100, 100);
            progressBar.style.width = `${pauseProgress}%`;

            if (pauseElapsed >= pauseTime) {
                clearInterval(pauseInterval);
                unlockContent();
            }
        }, 1000);
    }

    function unlockContent() {
        // Desbloqueia o conteúdo original
        elapsed = 0;
        progressBar.style.width = `${0}%`
        header.style.display = display;
        bookContent.innerHTML = `
            <section id="book-content-section">
            <h2 id="chapter1">Capítulo 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
            <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            <h2 id="chapter2">Capítulo 2</h2>
            <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
            <p>Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
            <h2 id="chapter3">Capítulo 3</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
            <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            <h2 id="chapter4">Capítulo 4</h2>
            <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
            <p>Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
            <h2 id="chapter5">Capítulo 5</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
            <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            <h2 id="chapter6">Capítulo 6</h2>
            <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
            <p>Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
            <h2 id="chapter7">Capítulo 7</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
            <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        </section>
        `;
        bookContentSection = document.getElementById('book-content-section').querySelectorAll('p');
        bookContentSection[actualParagraph].classList.add('highlight');
        startTimer();
    }
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    })

    scrollDownButton.addEventListener('click', () => {
        bookContentSection[actualParagraph].classList.remove('highlight');
        actualParagraph++;
        if (actualParagraph >= bookContentSection.length) {
            actualParagraph = 0;
        }
        bookContentSection[actualParagraph].classList.add('highlight');
        bookContentSection[actualParagraph].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
