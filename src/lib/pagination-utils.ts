// Max pages to show before using ellipsis
export const MAX_PAGES_WITHOUT_ELLIPSIS = 7;

// Returns page numbers to show, with ellipsis for large page counts
export function generatePageNumbers(
    currentPage: number,
    totalPages: number
): (number | "ellipsis")[] {
    if (totalPages <= MAX_PAGES_WITHOUT_ELLIPSIS) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];
    const delta = 1; // pages to show on each side of current

    pages.push(1);

    let start = Math.max(2, currentPage - delta);
    let end = Math.min(totalPages - 1, currentPage + delta);

    // expand range if near start/end
    if (currentPage <= 3) {
        end = Math.min(5, totalPages - 1);
    }

    if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 4);
    }

    if (start > 2) {
        pages.push("ellipsis");
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPages - 1) {
        pages.push("ellipsis");
    }

    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return pages;
}

