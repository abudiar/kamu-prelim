export default function ({ app, redirect }) {
  let access_token = app.context.app.$cookiz.get('access_token');
  if (!access_token) {
    return redirect('/login')
  }
}
