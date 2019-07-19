export default function({ store, redirect }) {
  // console.log(store)
  if (!store.state.login.univer.id) {
    redirect('/log-in')
  }
}
