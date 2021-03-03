function vmodal(options){
    const ANIMATION_SPEED = 200;
    const $modal = _createModal(options);
    let closing = false;
    let destroyed = false;

    const modal = {
        open() {
            if(destroyed){
                return console.log('Modal is destroyed');
            }
            !closing && $modal.classList.add('open');
         },
         close() {
             closing = true;
             $modal.classList.remove('open');
             $modal.classList.add('hide');
             setTimeout(() => {
                 $modal.classList.remove('hide');
                 closing = false;
                 if(typeof options.onClose === 'function'){
                    options.onClose();
                 }
             }, ANIMATION_SPEED);
         }
    };

    const listener = event => {
        console.log('Clicked', event.target.dataset.close);
        if(event.target.dataset.close){
            modal.close(); 
         }
    }
    $modal.addEventListener('click', listener);
    
    return Object.assign(modal, {
        destroy(){
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed = true;
        }
    });
}

function _createModal(options){
    const wrapper = document.querySelector('.container');
     const modal = document.createElement('div');
     modal.classList.add('vmodal');
     modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
        <div class="modal-window popup">
            ${options.content}
        </div>
    </div>
     `);
     wrapper.appendChild(modal);
    return modal;   
}

export {vmodal};