use tauri::{Menu, MenuItem, Submenu};

pub fn get_menu() -> Menu<String> {
  let my_app_menu = Menu::new()
    .add_native_item(MenuItem::Cut)
    .add_native_item(MenuItem::Copy)
    .add_native_item(MenuItem::Paste)
    .add_native_item(MenuItem::SelectAll)
    .add_native_item(MenuItem::Quit);

  Menu::new().add_submenu(Submenu::new("My app", my_app_menu))
}
