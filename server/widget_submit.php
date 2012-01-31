<?php echo $_GET['callback'] ?>({
  ip: "<?php echo $_SERVER['REMOTE_ADDR'] ?>",
  site: "<?php echo $_GET['install_url'] ?>",
  referer: "<?php echo $_SERVER['HTTP_REFERER'] ?>",
  ua: "<?php echo $_SERVER['HTTP_USER_AGENT'] ?>",
  message: "Success! You said <?php echo $_GET['text'] ?>."
});