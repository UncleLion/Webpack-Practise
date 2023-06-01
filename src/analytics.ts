import * as $ from 'jquery' 

function createAnalytics(): object {
    let counter = 0
    let destroyed: boolean = false

    const listener = (): number => counter++

    $(document).on('click', listener)// here was  the method addEventListener

    return {
        destroy() {
            $(document).off('click', listener)// here was the method removeEventListener
            destroyed  = true
        },

        // Показує скільки разів ми клікнули по документу
        getClicks() {
            if (destroyed)  {
                return `Analytics is destroyed. Total clicks = ${counter}`
            }
            return counter
        }
    }
}

window['analytics'] = createAnalytics()