export function getChildComponent(parent, childName) {
    return parent.findWhere(node => {
        return node.type()
            && (
                node.type().displayName === childName
                || node.type().name === childName
            )
    })
}
