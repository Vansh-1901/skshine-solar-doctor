DROP POLICY IF EXISTS "Authenticated can manage gallery" ON public.gallery_images;
CREATE POLICY "Authenticated can insert gallery" ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update gallery" ON public.gallery_images FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete gallery" ON public.gallery_images FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public can view gallery files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'project-gallery');
CREATE POLICY "Authenticated can upload gallery files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-gallery');
CREATE POLICY "Authenticated can delete gallery files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-gallery');