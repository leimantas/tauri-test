#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[cfg(target_os = "macos")]
mod menu;

fn main() {
  let mut builder = tauri::Builder::default();

  #[cfg(target_os = "macos")]
  {
    // set menu only on macos
    builder = builder.menu(menu::get_menu());
  }

  builder
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
