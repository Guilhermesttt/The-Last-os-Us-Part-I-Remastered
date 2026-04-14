import React from 'react'

function History() {
    return (
        <div className="animate-in fade-in zoom-in duration-700">
            <History />
            <button
                className="mt-8 text-white/30 hover:text-white transition-colors uppercase text-xs tracking-widest"
            >
                Voltar ao Menu
            </button>
        </div>
    )
}

export default History