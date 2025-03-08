/**
 * Encuentra la mejor combinación de productos cuyo costo total no supere un presupuesto dado.
 * Utiliza un enfoque de búsqueda exhaustiva para evaluar todas las combinaciones posibles.
 */
export const findBestCombination = (products: any[], budget: number): any[] => {
    let bestCombination: any[] = []; // Almacena la mejor combinación encontrada
    let bestTotal = 0; // Almacena el total más alto encontrado dentro del presupuesto

    /**  * Función recursiva para explorar todas las combinaciones posibles de productos */
    const findSubset = (subset: any[], remaining: any[], total: number) => {
        // Si el total supera el presupuesto, detener la búsqueda en esta rama
        if (total > budget) return;

        // Si el total actual es mejor que el mejor encontrado, actualizar los valores óptimos
        if (total > bestTotal) {
            bestTotal = total;
            bestCombination = [...subset];
        }

        // Explorar combinaciones agregando productos restantes uno por uno
        for (let i = 0; i < remaining.length; i++) {
            findSubset(
                [...subset, remaining[i]], // Agregar el producto actual al subconjunto
                remaining.slice(i + 1), // Excluir el producto actual de los restantes
                total + remaining[i].price // Sumar el precio del producto actual al total
            );
        }
    };

    // Iniciar la búsqueda con un subconjunto vacío
    findSubset([], products, 0);
    return bestCombination;
};
