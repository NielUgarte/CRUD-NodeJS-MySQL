const pool = require('../database')

exports.getaddLinks = async(req, res) => {
  res.render('links/add');
}

exports.postaddLinks = async(req, res) => {
  try {
    const { title, url, description} = req.body;
    const newLink = {
      title,
      url,
      description,
      id_user: req.user.id
  };
    await pool.query('INSERT INTO link SET ?', [newLink]);  
    req.flash('success','Link Saved Successfully')
    res.redirect('/links')
    console.log(req.body);
    
  } catch (error) {
    console.log(error);
  }
}
exports.getLinks = async (req, res) => {
  try {
    const links = await pool.query('SELECT * FROM link WHERE id_user = ?', [req.user.id])
    res.render('links/list', {links})
  } catch (error) {
    
  }

}
exports.deleteLinks = async (req, res) => {
  try {
    const {id} = req.params;
    await pool.query('DELETE FROM link WHERE id = ?', [id])
    req.flash('success','Link Removed Successfully')
     res.redirect('/links')    
  } catch (error) {
    
  }
 }
 exports.getLink = async (req, res) => {
   try {
     const {id} = req.params;
     const link = await pool.query('SELECT * FROM link WHERE id = ?', [id]);
     res.render('links/edit', {link:link[0]})
   } catch (error) {
     
   }
 }
 exports.updateLink = async (req, res) => {
   try {
     const {id} = req.params;
     const {title, url, description} = req.body;
     const newLink = {
        title,
        url,
        description
     }
     await pool.query('UPDATE link SET ? WHERE id = ?', [newLink, id])
     req.flash('success','Link Updated Successfully')
     res.redirect('/links')
   } catch (error) {
     
   }
 }