export type NewTaskModel = {
    description: string
    status: 'OPEN' | ' IN_PROGRESS' | 'DONE'
}