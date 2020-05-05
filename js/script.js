let firstCardFront = '';
        let firstCardBack = '';
        let secondCardFront = '';
        let secondCardBack = '';
        let total = 0;
        let lockBoard = false;

        const cards = document.querySelectorAll('.card');
        const resetBtn = document.getElementById('btn-reset');
        const modalResetBtn = document.getElementById('modal-reset-btn');
        
        resetBtn.addEventListener('click', function() {
            resetButton();
        });

        modalResetBtn.addEventListener('click', function() {
            resetButton();
            $('#modal').modal('hide');
        });

        (function shuffle() {
            shuffleCards()
        })();

        function resetButton() {
            total = 0;
            resetVariables();
            shuffleCards();

            let fronts = document.querySelectorAll('.front');
            for(let i=0; i<fronts.length; i++){
                fronts[i].classList.remove('d-none');
            }

            let backs = document.querySelectorAll('.back');
            for(let i=0; i<backs.length; i++){
                backs[i].classList.remove('d-none');
                backs[i].classList.add('d-none');
            }
        }

        function shuffleCards() {
            cards.forEach((card) => {
                let randomPosition = Math.floor(Math.random() * 16);
                card.style.order = randomPosition;
            });
        }

        function resetVariables() {
            firstCardFront = '';
            firstCardBack = '';
            secondCardFront = '';
            secondCardBack = '';
        }

        function compareCards(event) {
            if (lockBoard) return;    
                
            let selectedBackCard = event.target;
            selectedBackCard.classList.add('d-none');
            let selectedFrontCard = event.target.nextElementSibling;
            selectedFrontCard.classList.remove('d-none');
            
            if (secondCardBack == '' && firstCardBack != '') {
                secondCardBack = selectedBackCard;
                secondCardFront = selectedFrontCard;
            }

            if (firstCardBack == '' && secondCardBack == '') {
                firstCardBack = selectedBackCard;
                firstCardFront = selectedFrontCard;
            }

            if (firstCardBack != '' && secondCardBack != '') {
                if (firstCardFront.src != secondCardFront.src) {
                        lockBoard = true;
                    setTimeout(function() {
                        firstCardFront.classList.add('d-none');
                        firstCardBack.classList.remove('d-none');
                        secondCardFront.classList.add('d-none');
                        secondCardBack.classList.remove('d-none');
                        resetVariables();
                            
                        lockBoard = false;
                    }, 300);
                } else {
                    total++;
                    resetVariables();
                    if (total === 8) {
                        $('#modal').modal('show');
                    }
                }
            }
        }
