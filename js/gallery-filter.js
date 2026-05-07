/* ============================================
   NELSON ART PRO - GALLERY-FILTER.JS
   Fonctionnalités :
   - Filtrage par catégorie
   - Lightbox pour images et vidéos
   - Navigation dans la lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== FILTRAGE GALERIE =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('filter-btn--active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    // Animation de réapparition
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = document.getElementById('lightbox-media');
    const lightboxInfo = document.getElementById('lightbox-info');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxNext = document.querySelector('.lightbox__next');
    const lightboxPrev = document.querySelector('.lightbox__prev');
    
    let currentGalleryItems = [];
    let currentIndex = 0;
    
    window.openLightbox = function(element, type = 'image') {
        const galleryItem = element.closest('.gallery-item');
        const img = galleryItem.querySelector('img');
        const category = galleryItem.querySelector('.gallery-item__category')?.textContent || '';
        const title = galleryItem.querySelector('.gallery-item__title')?.textContent || '';
        
        // Récupérer tous les éléments visibles de la même catégorie
        const currentFilter = document.querySelector('.filter-btn--active').getAttribute('data-filter');
        
        if (currentFilter === 'all') {
            currentGalleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
        } else {
            currentGalleryItems = Array.from(document.querySelectorAll(`.gallery-item[data-category="${currentFilter}"]:not(.hidden)`));
        }
        
        currentIndex = currentGalleryItems.indexOf(galleryItem);
        
        // Afficher le média
        if (type === 'video') {
            // Remplacer par l'URL de votre vidéo YouTube
            lightboxMedia.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" 
                    title="Vidéo" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        } else {
            lightboxMedia.innerHTML = `<img src="${img.src}" alt="${title}">`;
        }
        
        // Mettre à jour les infos
        lightboxInfo.querySelector('.lightbox__category').textContent = category;
        lightboxInfo.querySelector('.lightbox__title').textContent = title;
        
        // Afficher la lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxMedia.innerHTML = '';
        document.body.style.overflow = '';
    }
    
    function nextItem() {
        currentIndex = (currentIndex + 1) % currentGalleryItems.length;
        updateLightboxContent();
    }
    
    function prevItem() {
        currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
        updateLightboxContent();
    }
    
    function updateLightboxContent() {
        const item = currentGalleryItems[currentIndex];
        const img = item.querySelector('img');
        const category = item.querySelector('.gallery-item__category')?.textContent || '';
        const title = item.querySelector('.gallery-item__title')?.textContent || '';
        const zoomBtn = item.querySelector('.gallery-item__zoom');
        
        if (zoomBtn.classList.contains('gallery-item__zoom--play')) {
            lightboxMedia.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" 
                    title="Vidéo" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        } else {
            lightboxMedia.innerHTML = `<img src="${img.src}" alt="${title}">`;
        }
        
        lightboxInfo.querySelector('.lightbox__category').textContent = category;
        lightboxInfo.querySelector('.lightbox__title').textContent = title;
    }
    
    // Événements Lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxCloseBtn.addEventListener('click', closeLightbox);
    
    lightboxNext.addEventListener('click', nextItem);
    lightboxPrev.addEventListener('click', prevItem);
    
    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextItem();
                break;
            case 'ArrowLeft':
                prevItem();
                break;
        }
    });
    
    // Fermer en cliquant en dehors de l'image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ===== FILTRAGE PAR URL (si on arrive avec ?filter=design) =====
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    
    if (urlFilter) {
        const targetButton = document.querySelector(`.filter-btn[data-filter="${urlFilter}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
});