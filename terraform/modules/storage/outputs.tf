output "disk_name" {
    value = "${google_compute_disk.primary.*.name}"
}

output "bucket_name" {
    value = "${google_storage_bucket.primary.name}"
}
