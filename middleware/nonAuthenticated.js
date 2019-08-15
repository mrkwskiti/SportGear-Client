export default function({ store, redirect }) {
  if (store.state.login.univer.id) {
    redirect('/sign-up')
  }
}
