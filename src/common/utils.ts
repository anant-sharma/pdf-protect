/**
 * This file contains the code required
 * for common utiils.
 */

export async function delay(time: number) {

    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });

}
