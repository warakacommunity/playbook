---
title: Maintenance and Post-Release Strategy
sidebar_position: 2
---

# Maintenance and Post-Release Strategy

Release is a milestone, not the end. A dataset that is corrected, extended, and supported over time grows in value, while one that is published and abandoned slowly decays as links rot, errors go unfixed, and it falls out of step with the field. Plan for the long life of the data from the start.

## Version and deprecate deliberately

Treat the dataset like software. Give every release a version number, keep a short changelog of what changed and why, and never overwrite an old version, so that results computed on it remain reproducible. When a version is superseded, or a problem makes it unsafe to use, deprecate it clearly rather than silently deleting it, and point users to the replacement. This is the same versioning discipline the [Data Quality](../4_data-quality/index.md) chapter argues for, carried through to the public release.

## Keep the community in the loop

A living dataset has a way for users to report problems and suggest improvements, whether an issue tracker, a discussion forum, or a contact address, and someone who actually responds. Community feedback is how errors get found and how the dataset stays relevant, and it closes the loop back to the participatory spirit of the whole playbook: the people who use and are represented by the data should be able to shape its future. Maintenance is also where sustainability becomes real, so be honest about who will keep the work alive and resource it, rather than assuming it maintains itself (see [Documentation](../6_documentation/sustainability-plan.md)).
