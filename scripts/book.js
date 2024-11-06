document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('title');
    const paragraph = urlParams.get('paragraph');


    let readingTime; // Tempo de leitura escolhido
    // const pomodoroCycle = 25 * 60 * 1000; // Tempo de 1 ciclo Pomodoro (25 minutos em ms)
    // const pauseTime = 5 * 60 * 1000; // Tempo de pausa (5 minutos em ms)

    const pomodoroCycle = 1 * 5 * 1000; // Tempo de 1 ciclo Pomodoro (25 minutos em ms)
    const pauseTime = 1 * 5 * 1000; // Tempo de pausa (5 minutos em ms)
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
    const modalTimeSelection = document.getElementById('modal-time-selection');
    const modalEndReading = document.getElementById('modal-end-reading');
    const timeOptions = document.querySelectorAll('.time-option');
    const continueReadingBtn = document.getElementById('continue-reading');
    const goBackBtn = document.getElementById('go-back');
    let bookContentSection = document.getElementById('book-content-section').querySelectorAll('p');
    let actualParagraph = paragraph ? Number(paragraph) : 0;
    bookContentSection[actualParagraph].classList.add('highlight');
    bookContentSection[actualParagraph].scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Função para iniciar o temporizador

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
        startReadingCycle(completedCycles)
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


    // Função para abrir o modal de seleção de tempo
    function openModalSelection() {
        modalTimeSelection.style.display = 'flex';
    }

    // Função para fechar o modal de seleção de tempo
    function closeModalSelection() {
        modalTimeSelection.style.display = 'none';
    }

    // Ação para cada opção de tempo
    timeOptions.forEach(button => {
        button.addEventListener('click', () => {
            readingTime = Number(button.getAttribute('data-time')) / 5 * 1 * 1000; // Converte para ms
            const cycles = Math.ceil(readingTime / pomodoroCycle); // Calcula o número de ciclos necessários
            closeModalSelection();
            startReadingCycle(cycles); // Inicia o ciclo de leitura
        });
    });

    let completedCycles = 0;;
    // Função para iniciar o ciclo de leitura
    function startReadingCycle(cycles) {
        function startTimer() {
            interval = setInterval(() => {
                console.log('interval', isPaused);
                if (!isPaused) {
                    elapsed += 1000; // Incrementa o tempo passado em 1 segundo
                    const progress = Math.min((elapsed / pomodoroCycle) * 100, 100);
                    progressBar.style.width = `${progress}%`;

                    if (elapsed >= pomodoroCycle) {
                        completedCycles++;
                        clearInterval(interval);
                        progressBar.style.width = '0%';
                        elapsed = 0;
                        if (completedCycles < cycles) {
                            lockContent();
                        } else {
                            openModalEndReading();
                        }
                    } else if (elapsed >= readingTime) {
                        clearInterval(interval);
                        progressBar.style.width = '0%';
                        elapsed = 0;
                        openModalEndReading();
                    }
                }
            }, 1000);
        }
        startTimer();
    }

    // Função para abrir o modal de fim de leitura
    function openModalEndReading() {
        modalEndReading.style.display = 'flex';
    }

    // Ação dos botões no modal de fim de leitura
    continueReadingBtn.addEventListener('click', () => {
        modalEndReading.style.display = 'none';
        openModalSelection(); // Abre o modal para escolher novo tempo de leitura
    });

    goBackBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Abre o modal de seleção de tempo ao carregar a página
    openModalSelection();
});