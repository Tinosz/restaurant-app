function isValidURL(url) {
    // Regular expression for a valid URL
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)$/;

    // Test the URL against the pattern
    return urlPattern.test(url);
}
