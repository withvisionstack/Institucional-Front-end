// Variáveis do carrossel infinito
        let currentIndex = 0;
        const scrollAmount = 340; // Largura do card + gap
        let isScrolling = false;

        // Função para rolar o carrossel infinitamente
        function scrollCarousel(direction) {
            if (isScrolling) return;
            
            const carousel = document.getElementById('carousel');
            const cards = carousel.children;
            const totalCards = cards.length;
            
            isScrolling = true;
            
            if (direction === 1) {
                // Scroll para direita
                currentIndex++;
                carousel.scrollLeft += scrollAmount;
                
                // Se chegou no final, volta pro início
                if (currentIndex >= totalCards) {
                    setTimeout(() => {
                        carousel.style.scrollBehavior = 'auto';
                        carousel.scrollLeft = 0;
                        currentIndex = 0;
                        setTimeout(() => {
                            carousel.style.scrollBehavior = 'smooth';
                            isScrolling = false;
                        }, 50);
                    }, 300);
                } else {
                    setTimeout(() => {
                        isScrolling = false;
                    }, 300);
                }
            } else {
                // Scroll para esquerda
                currentIndex--;
                
                // Se está no início, vai pro final
                if (currentIndex < 0) {
                    carousel.style.scrollBehavior = 'auto';
                    carousel.scrollLeft = scrollAmount * (totalCards - 1);
                    currentIndex = totalCards - 1;
                    setTimeout(() => {
                        carousel.style.scrollBehavior = 'smooth';
                        isScrolling = false;
                    }, 50);
                } else {
                    carousel.scrollLeft -= scrollAmount;
                    setTimeout(() => {
                        isScrolling = false;
                    }, 300);
                }
            }
        }

        // Auto-scroll do carrossel (opcional)
        function startAutoScroll() {
            setInterval(() => {
                if (!isScrolling) {
                    scrollCarousel(1);
                }
            }, 4000); // Muda a cada 4 segundos
        }

        // Função para alternar menu mobile
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuIcon = document.getElementById('menuIcon');
            
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }

        // Smooth scroll para links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Fechar menu mobile se estiver aberto
                const mobileMenu = document.getElementById('mobileMenu');
                const menuIcon = document.getElementById('menuIcon');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            });
        });

        // Inicializar auto-scroll quando a página carregar
        document.addEventListener('DOMContentLoaded', function() {
            // Descomente a linha abaixo se quiser auto-scroll automático
            // startAutoScroll();
        });

        // Parar auto-scroll quando hover nos botões ou carrossel
        document.getElementById('carousel').addEventListener('mouseenter', function() {
            isScrolling = true;
        });

        document.getElementById('carousel').addEventListener('mouseleave', function() {
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        });