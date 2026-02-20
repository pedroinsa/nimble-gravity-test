
export function find_input_error(url: string) {

    if (!url.startsWith("https://github.com/")) {
        return true
    }
    return false

}