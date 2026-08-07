import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ZoomIn, Plus, Trash2, Edit3, Image as ImageIcon, Save, RefreshCw } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  onAddPhoto?: (photo: GalleryPhoto) => void;
  onRemovePhoto?: (id: string) => void;
  onUpdatePhoto?: (photo: GalleryPhoto) => void;
}

export function PhotoGallery({ photos, onAddPhoto, onRemovePhoto, onUpdatePhoto }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl || !onAddPhoto) return;

    onAddPhoto({
      id: Date.now().toString(),
      url: newPhotoUrl,
      title: newPhotoTitle || 'Unforgettable Moment',
      caption: newPhotoCaption || 'A beautiful memory together.'
    });

    setNewPhotoUrl('');
    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhoto && onUpdatePhoto) {
      onUpdatePhoto(editingPhoto);
      setSelectedPhoto(editingPhoto);
      setEditingPhoto(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const res = reader.result as string;
          if (isEdit && editingPhoto) {
            setEditingPhoto({ ...editingPhoto, url: res });
          } else {
            setNewPhotoUrl(res);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-[#FF6FAE] text-sm font-semibold tracking-widest uppercase">
            <Camera className="w-4 h-4" />
            <span>Captured Happiness</span>
          </div>
          <h2 className="font-great-vibes text-5xl sm:text-6xl text-white text-glow">
            Photo Gallery
          </h2>
          <p className="text-purple-200/80 text-sm max-w-md mx-auto">
            Glimpses of our sweetest smiles and cherished moments
          </p>

          {/* Add Photo Button */}
          {onAddPhoto && (
            <div className="pt-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:bg-white/10 text-pink-200 text-xs font-semibold uppercase tracking-wider border border-[#FF6FAE]/40 transition-colors cursor-pointer shadow-lg hover:scale-105"
              >
                <Plus className="w-4 h-4 text-[#FF6FAE]" />
                <span>Add Memory Photo</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden glass-card group cursor-pointer border border-[#FF6FAE]/20 hover:border-[#FF6FAE]/60 transition-all duration-300"
            >
              <div onClick={() => setSelectedPhoto(photo)}>
                {/* Photo Image */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0518]/90 via-[#0b0518]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-[#FF6FAE] mb-1">
                    <ZoomIn className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Click to Enlarge</span>
                  </div>
                  <h3 className="font-great-vibes text-2xl text-white">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-purple-200 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Quick Remove Button on Hover */}
              {onRemovePhoto && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePhoto(photo.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-lg"
                  title="Remove photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Lightbox & Edit Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedPhoto(null);
                setEditingPhoto(null);
              }}
              className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border border-[#FF6FAE]/40 p-4 sm:p-6 space-y-4"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedPhoto(null);
                    setEditingPhoto(null);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                {!editingPhoto ? (
                  <>
                    {/* Expanded Image */}
                    <div className="max-h-[65vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 relative">
                      <img
                        src={selectedPhoto.url}
                        alt={selectedPhoto.title}
                        referrerPolicy="no-referrer"
                        className="max-h-[65vh] w-auto object-contain rounded-2xl shadow-2xl"
                      />
                    </div>

                    {/* Photo Details & Actions */}
                    <div className="text-center space-y-2 pt-2">
                      <h3 className="font-great-vibes text-3xl sm:text-4xl text-[#FF6FAE] text-glow">
                        {selectedPhoto.title}
                      </h3>
                      <p className="text-purple-200 text-sm max-w-xl mx-auto italic font-poppins">
                        "{selectedPhoto.caption}"
                      </p>

                      <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/10">
                        {onUpdatePhoto && (
                          <button
                            onClick={() => setEditingPhoto(selectedPhoto)}
                            className="px-4 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/40 text-pink-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Title / Caption</span>
                          </button>
                        )}
                        {onRemovePhoto && (
                          <button
                            onClick={() => {
                              onRemovePhoto(selectedPhoto.id);
                              setSelectedPhoto(null);
                            }}
                            className="px-4 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Photo</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Edit Mode Form */
                  <form onSubmit={handleEditSubmit} className="space-y-4 p-2 text-left">
                    <h3 className="font-serif text-xl font-bold text-pink-200">Edit Photo Details</h3>
                    <div>
                      <label className="block text-xs uppercase text-pink-300 font-semibold mb-1">Title</label>
                      <input
                        type="text"
                        value={editingPhoto.title}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-pink-300 font-semibold mb-1">Caption</label>
                      <textarea
                        value={editingPhoto.caption}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE] h-20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-pink-300 font-semibold mb-1">Replace Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, true)}
                        className="block w-full text-xs text-purple-200 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FF6FAE] file:text-white hover:file:bg-[#C084FC] cursor-pointer"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPhoto(null)}
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Photo Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#FF6FAE]/50 space-y-4 relative">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute top-4 right-4 text-purple-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="font-great-vibes text-3xl text-pink-200">Add Memory Photo</h3>

                <form onSubmit={handleAddSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs uppercase text-pink-300 font-semibold mb-1">Upload Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, false)}
                      className="block w-full text-xs text-purple-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FF6FAE] file:text-white hover:file:bg-[#C084FC] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-pink-300 font-semibold mb-1">Or Image URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-pink-300 font-semibold mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Our Beach Sunset"
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-pink-300 font-semibold mb-1">Caption</label>
                    <textarea
                      placeholder="Special words for this photo..."
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE] h-20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] text-white font-semibold text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  >
                    Save Photo to Gallery
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
