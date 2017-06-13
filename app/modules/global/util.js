export function compareListViewRows(firstRow, secondRow) {
    for (let key in firstRow) {
        if (!secondRow.hasOwnProperty(key))
            return true;
        if (firstRow[key] !== secondRow[key])
            return true;
    }
    return false;
}